// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authController = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

// اتصال مستقیم به MongoDB (URI داخل سورس)
const MONGO_URI = 'mongodb+srv://render_user:cuNKUrBxUR6ZIgzL@cluster0.fwjxsrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/messages', messageRoutes);

// محدود کردن مسیرهای ادمین
app.use('/api/admin', authController.protect, authController.restrictToAdmin);

// --- اتصال به MongoDB و اجرای سرور ---
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
})
.catch((err) => console.error('❌ MongoDB connection error:', err));
