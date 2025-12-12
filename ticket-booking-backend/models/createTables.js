const pool = require('../db');  // Import database connection

const createTables = async () => {
    try {
        // Create shows table
        await pool.query(`
        CREATE TABLE IF NOT EXISTS shows (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            start_time TIMESTAMP NOT NULL,
            total_seats INT NOT NULL,
            available_seats INT NOT NULL
        );`);

        // Create bookings table
        await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            show_id INT REFERENCES shows(id),
            seats INT NOT NULL,
            status VARCHAR(20) DEFAULT 'PENDING',
            created_at TIMESTAMP DEFAULT NOW()
        );`);

        console.log("Tables created successfully!");
    } catch (err) {
        console.error("Error creating tables:", err);
    }
};

module.exports = createTables;
