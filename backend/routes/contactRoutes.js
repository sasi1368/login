const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');

// محافظت شده
router.post('/', authController.protect, contactController.createContact);
router.get('/', authController.protect, contactController.getContacts);

module.exports = router;
