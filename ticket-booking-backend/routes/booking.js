const express = require('express');
const router = express.Router();
const pool = require('../db');

// Book seats
router.post('/book/:showId', async (req, res) => {
    const showId = Number(req.params.showId);
    const seats = Number(req.body.seats);

    if (!showId || isNaN(showId)) {
        return res.status(400).json({ error: "Invalid show ID" });
    }

    if (!seats || seats < 1) {
        return res.status(400).json({ error: "Seats must be at least 1" });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Lock the show row
        const showRes = await client.query(
            "SELECT * FROM shows WHERE id = $1 FOR UPDATE",
            [showId]
        );

        if (showRes.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: "Show not found" });
        }

        const show = showRes.rows[0];

        if (show.available_seats < seats) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: "Not enough seats available" });
        }

        // Deduct seats
        await client.query(
            "UPDATE shows SET available_seats = available_seats - $1 WHERE id = $2",
            [seats, showId]
        );

        // Insert booking
        const bookingRes = await client.query(
            "INSERT INTO bookings (show_id, seats, status) VALUES ($1, $2, 'CONFIRMED') RETURNING *",
            [showId, seats]
        );

        // Get updated show details
        const updatedShow = await client.query(
            "SELECT * FROM shows WHERE id = $1",
            [showId]
        );

        await client.query('COMMIT');

        res.json({
            message: "Booking successful",
            booking: bookingRes.rows[0],
            updatedShow: updatedShow.rows[0]
        });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Booking error:", err);
        res.status(500).json({ error: "Booking failed" });
    } finally {
        client.release();
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM bookings ORDER BY created_at DESC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
