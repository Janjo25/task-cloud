const {Pool} = require("pg");
require("dotenv").config();

const pool = new Pool({
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST || "database",
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,

    ssl: { rejectUnauthorized: false }
});

module.exports = pool;
