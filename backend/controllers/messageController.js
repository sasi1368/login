const Message = require('../models/Message');
const User = require('../models/User');

// ارسال پیام از کاربر به ادمین
exports.sendMessageToAdmin = async (req, res) => {
  try {
    const message = new Message({
      sender: req.user.userId,
      text: req.body.text,
      fromAdmin: false,
      receiver: null // پیام از کاربر به ادمین
    });

    await message.save();
    res.status(201).json({ message: 'Message sent to admin' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

// ارسال پیام از ادمین به کاربر
exports.sendMessageToUser = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const message = new Message({
      sender: req.user.userId,
      receiver: userId,
      text,
      fromAdmin: true
    });

    await message.save();
    res.status(201).json({ message: 'Message sent to user' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

// دریافت پیام‌های کاربر جاری
exports.getUserMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.userId },
        { receiver: req.user.userId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages' });
  }
};

// دریافت همه پیام‌ها برای ادمین
exports.getAllMessages = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const messages = await Message.find().populate('sender receiver', 'name email').sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages' });
  }
};
