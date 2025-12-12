const express = require('express');
const router = express.Router();
const pool = require('../db');

// =============================
// CREATE SHOW
// =============================
router.post('/create-show', async (req, res) => {
    const { name, start_time, total_seats } = req.body;

    if (!name || !start_time || !total_seats)
        return res.status(400).json({ error: "All fields are required" });

    try {
        const result = await pool.query(
            `INSERT INTO shows (name, start_time, total_seats, available_seats)
             VALUES ($1, $2, $3, $3)
             RETURNING *`,
            [name, start_time, total_seats]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("CREATE ERROR:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// =============================
// READ – LIST ALL SHOWS
// =============================
router.get('/shows', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM shows ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        console.error("LIST ERROR:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// =============================
// UPDATE SHOW
// =============================
router.put('/update-show/:id', async (req, res) => {
    const { id } = req.params;
    const { name, start_time, total_seats } = req.body;

    try {
        const existing = await pool.query(
            "SELECT * FROM shows WHERE id = $1",
            [id]
        );

        if (existing.rows.length === 0)
            return res.status(404).json({ error: "Show not found" });

        const old = existing.rows[0];

        const result = await pool.query(
            `UPDATE shows
             SET name = $1,
                 start_time = $2,
                 total_seats = $3,
                 available_seats = $4
             WHERE id = $5
             RETURNING *`,
            [
                name || old.name,
                start_time || old.start_time,
                total_seats || old.total_seats,
                total_seats || old.available_seats, // reset available if seats change
                id
            ]
        );

        res.json(result.rows[0]);

    } catch (err) {
        console.error("UPDATE ERROR:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// =============================
// DELETE SHOW
// =============================
router.delete('/delete-show/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM shows WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ error: "Show not found" });

        res.json({ message: "Show deleted successfully" });

    } catch (err) {
        console.error("DELETE ERROR:", err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
