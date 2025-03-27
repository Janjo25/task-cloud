/** @type {import("pg").Pool} */
const db = require("../config/db");

async function findUserByUsername(username) {
    const query = `
        SELECT
            account_id        AS accountId,
            email,
            profile_image_url AS profileImageUrl,
            username
        FROM account
        WHERE username = $1;
    `;
    const result = await db.query(query, [username]);
    return result.rows[0];
}

module.exports = {
    findUserByUsername,
};
