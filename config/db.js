const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: 'postgresql://nursultan:R23FJSWMhx7sTwS9gD2lkOQIflbIzqLt@dpg-d29ljcs9c44c73eqjm40-a.oregon-postgres.render.com/sport_booking_db_im81',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;