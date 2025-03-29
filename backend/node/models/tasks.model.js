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

// updateTask updates the title and description of a task.
async function updateTask(taskId, description, title, accountId) {
    const query = `
        UPDATE task
        SET
            description = $1,
            title       = $2
        WHERE task_id = $3
          AND account_id = $4
        RETURNING account_id, completed, created_at, description, title;
    `;
    const values = [description || null, title, taskId, accountId];
    const result = await db.query(query, values);
    return camelcaseKeys(result.rows[0]);
}

module.exports = {
    createTask,
    getTasksByUserId,
    updateTask,
};
