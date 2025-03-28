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

async function getTasksByUserId(accountId) {
    const query = `
        SELECT task_id, completed, created_at, description, title, account_id
        FROM task
        WHERE account_id = $1
        ORDER BY created_at DESC;
    `;
    const values = [accountId];
    const result = await db.query(query, values);
    return camelcaseKeys(result.rows);
}

module.exports = {
    createTask,
    getTasksByUserId,
};
