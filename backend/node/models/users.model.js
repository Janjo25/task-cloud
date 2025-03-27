const camelcaseKeys = require("camelcase-keys").default;
/** @type {import("pg").Pool} */
const db = require("../config/db");

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
    findUserByUsername,
};
