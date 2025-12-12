const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createTables = require('./models/createTables');

const adminRoutes = require('./routes/admin');
const bookingRoutes = require('./routes/booking');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/admin', adminRoutes);
app.use('/booking', bookingRoutes);

const PORT = process.env.PORT || 5000;

// Initialize DB tables and start server
createTables().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
