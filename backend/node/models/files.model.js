const camelcaseKeys = require("camelcase-keys").default;
const {basename, join} = require("node:path");
const {unlink} = require("node:fs/promises");
/** @type {import("pg").Pool} */
const db = require("../config/db");

async function deleteFile(fileId, accountId) {
    // Looks up the file URL by file ID and account ID to ensure the file belongs to the user.
    const selectQuery = `
        SELECT file_url
        FROM file
        WHERE file_id = $1
          AND account_id = $2;
    `;
    const selectValues = [fileId, accountId];
    const selectResult = await db.query(selectQuery, selectValues);

    // If no rows are returned, the file does not exist or does not belong to the user.
    if (selectResult.rowCount === 0) return false;

    // Converts the URL to a local file path.
    const {fileUrl} = camelcaseKeys(selectResult.rows[0]);
    const filePath = join(__dirname, "..", "uploads", basename(fileUrl));

    // Deletes the file from the disk. If it fails, logs a warning but continues with the deletion from the database.
    await unlink(filePath).catch((error => console.warn("WARNING - Failed to delete file from disk:", error)));

    // Deletes the file from the database.
    const deleteQuery = `
        DELETE
        FROM file
        WHERE file_id = $1
          AND account_id = $2;
    `;
    const deleteValues = [fileId, accountId];
    const deleteResult = await db.query(deleteQuery, deleteValues);
    return deleteResult.rowCount === 1;
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
