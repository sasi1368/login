
// backend/routes/auth.js (در Express.js)
const express = require('express');
const router = express.Router();

// نمونه درخواست POST برای ورود
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // منطق اعتبارسنجی کاربر
  // مثلاً بررسی username و password در دیتابیس
  if (username === 'admin' && password === 'admin') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
