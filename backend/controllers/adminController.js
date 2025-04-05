const User = require('../models/User');
const Message = require('../models/Message');

// Get all users for the admin dashboard
exports.getUsers = async (req, res) => {
  const users = await User.find().populate('contacts');
  res.json({ users });
};

// Get all messages for the admin
exports.getMessages = async (req, res) => {
  const messages = await Message.find({ recipient: 'admin' }).populate('sender').populate('recipient');
  res.json(messages);
};

// Respond to a message
exports.respondToMessage = async (req, res) => {
  const { response } = req.body;
  const message = await Message.findById(req.params.messageId);
  message.adminResponse = response;
  await message.save();
  res.status(200).json({ message: 'Response sent' });
};
