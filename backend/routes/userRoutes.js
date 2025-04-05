const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Protect routes so only authenticated users can access them
router.get('/profile', authController.protect, userController.getUserProfile);
router.put('/profile', authController.protect, userController.updateUserProfile);

module.exports = router;
