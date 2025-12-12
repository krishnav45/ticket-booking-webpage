const { Pool } = require('pg');  // Import PostgreSQL client
require('dotenv').config();       // Load .env variables

// Create a new pool to connect to Postgres
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

module.exports = pool;  // Export to use in other files
