const camelcaseKeys = require("camelcase-keys").default;
/** @type {import("pg").Pool} */
const db = require("../config/db");

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
    saveFile,
};
