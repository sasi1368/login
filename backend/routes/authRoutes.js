// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// روت ثبت‌نام
router.post('/register', authController.register);

// روت ورود
router.post('/login', authController.login);

module.exports = router;
