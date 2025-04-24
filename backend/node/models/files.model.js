const camelcaseKeys = require("camelcase-keys").default;
const {basename, join} = require("node:path");
const {unlink} = require("node:fs/promises");
/** @type {import("pg").Pool} */
const db = require("../config/db");

require("dotenv").config(); // 💡 Esto carga .env al iniciar
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const BUCKET = "task-cloud-frontend"; // 💡 Asegúrate que este sea tu bucket real

async function deleteFile(fileId, accountId) {
    const selectQuery = `
        SELECT file_url
        FROM file
        WHERE file_id = $1
          AND account_id = $2;
    `;
    const selectValues = [fileId, accountId];
    const selectResult = await db.query(selectQuery, selectValues);

    if (selectResult.rowCount === 0) return false;

    const { fileUrl } = camelcaseKeys(selectResult.rows[0]);

    console.log("🧪 Access Key ID:", AWS.config.credentials?.accessKeyId);

    // 💥 Nuevo: eliminamos del bucket S3
    const key = fileUrl.split("/").pop(); // obtenemos solo el nombre del archivo
    await s3.deleteObject({
        Bucket: BUCKET,
        Key: key,
    }).promise().catch((err) =>
        console.warn("WARNING - Failed to delete file from S3:", err)
    );

    // 🧹 Eliminamos el archivo local si existe (puedes comentar esta línea si ya no los guardas localmente)
    await unlink(join(__dirname, "..", "storage", "user-files", key))
        .catch((err) =>
            console.warn("WARNING - Failed to delete file from disk:", err)
        );

    const deleteQuery = `
        DELETE
        FROM file
        WHERE file_id = $1
          AND account_id = $2
        RETURNING file_id;
    `;
    const deleteValues = [fileId, accountId];
    const deleteResult = await db.query(deleteQuery, deleteValues);
    return camelcaseKeys(deleteResult.rows[0]);
}

async function getFilesByUserId(accountId) {
    const query = `
        SELECT file_id, file_name, file_type, file_url, uploaded_at
        FROM file
        WHERE account_id = $1
        ORDER BY uploaded_at DESC;
    `;
    const values = [accountId];
    const result = await db.query(query, values);
    return camelcaseKeys(result.rows);
}

async function saveFile(fileName, fileType, fileUrl, accountId) {
    const query = `
        INSERT INTO file (file_name, file_type, file_url, account_id)
        VALUES ($1, $2, $3, $4)
        RETURNING file_id, file_name, file_type, file_url, uploaded_at, account_id;
    `;
    const values = [fileName, fileType, fileUrl, accountId];
    const result = await db.query(query, values);
    return camelcaseKeys(result.rows[0]);
}

module.exports = {
    deleteFile,
    getFilesByUserId,
    saveFile,
};
