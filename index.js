const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('./config/db');
const authMiddleware = require('./midllewares/authMiddlewares');
const app = express();
app.use(cors({
    origin: 'https://brilliant-toffee-ff455e.netlify.app'
}))
app.use(express.json());
const PORT = process.env.PORT || 3002;
const authRoutes = require('./routes/authRoutes');

const router = express.Router();
const authController = require('./controllers/authController');

app.use('/api', authRoutes);

module.exports = router;

app.listen(PORT, () => {
    console.log(`Сервер жұмыс істеп тұр ${PORT}`);
});
