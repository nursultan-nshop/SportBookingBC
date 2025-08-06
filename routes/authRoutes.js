const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authToken } = require('../midllewares/authMiddlewares');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/booking', authToken, authController.booking)

module.exports = router;
