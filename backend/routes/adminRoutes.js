const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

// Protect these routes so only authenticated users can access them
router.get('/users', authController.protect, adminController.getUsers);
router.get('/messages', authController.protect, adminController.getMessages);
router.post('/messages/respond/:messageId', authController.protect, adminController.respondToMessage);

module.exports = router;
