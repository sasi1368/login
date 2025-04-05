const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

// فقط کاربران لاگین‌کرده دسترسی دارند
router.post('/to-admin', authController.protect, messageController.sendMessageToAdmin); // ارسال پیام به ادمین
router.post('/to-user', authController.protect, authController.restrictToAdmin, messageController.sendMessageToUser); // ارسال پیام به کاربر توسط ادمین
router.get('/my', authController.protect, messageController.getUserMessages); // دریافت پیام‌ها برای کاربر
router.get('/all', authController.protect, authController.restrictToAdmin, messageController.getAllMessages); // دریافت تمام پیام‌ها برای ادمین

module.exports = router;
