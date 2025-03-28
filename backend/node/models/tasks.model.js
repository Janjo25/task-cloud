const camelcaseKeys = require("camelcase-keys").default;
/** @type {import("pg").Pool} */
const db = require("../config/db");

async function createTask(accountId, description, title) {
    const query = `
        INSERT INTO task (account_id, description, title)
        VALUES ($1, $2, $3)
        RETURNING account_id, completed, created_at, description, title;
    `;
    const values = [accountId, description || null, title];
    const result = await db.query(query, values);
    return camelcaseKeys(result.rows[0]);
}

module.exports = {
    createTask,
};
