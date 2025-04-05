// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authController = require('./controllers/authController');
require('dotenv').config(); // برای بارگذاری متغیرهای محیطی از فایل .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/messages', messageRoutes);

// Middleware for admin routes (if needed)
app.use('/api/admin', authController.protect, authController.restrictToAdmin);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
