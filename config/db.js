const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: 'postgresql://nursultan:HwKhYbSz48C26sTcf4kPtJYE6Zmti5fm@dpg-d2904dggjchc73c6uong-a.oregon-postgres.render.com/sport_booking_db_avy4',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;