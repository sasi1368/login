const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get user profile
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user.userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user data
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  await user.save();
  res.json({ message: 'Profile updated successfully' });
};
