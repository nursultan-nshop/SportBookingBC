const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: 'postgresql://nurs_n:6EfYSgo9EF1U6qRf66qgyPUHI7PH7Mxw@dpg-d28bbqfdiees73dh4m4g-a.oregon-postgres.render.com/sport_booking_db',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;