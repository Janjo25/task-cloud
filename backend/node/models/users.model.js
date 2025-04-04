const camelcaseKeys = require("camelcase-keys").default;
/** @type {import("pg").Pool} */
const db = require("../config/db");

async function createUser(email, password, profile_image_url, username) {
    const query = `
        INSERT INTO account (email, password, profile_image_url, username)
        VALUES ($1, $2, $3, $4);
    `;
    const values = [email, password, profile_image_url || null, username];
    await db.query(query, values);
}

async function findUserByUsername(username) {
    const query = `
        SELECT
            account_id,
            email,
            password,
            profile_image_url,
            username
        FROM account
        WHERE username = $1;
    `;
    const result = await db.query(query, [username]);
    return camelcaseKeys(result.rows[0]);
}

module.exports = {
    createUser,
    findUserByUsername,
};
