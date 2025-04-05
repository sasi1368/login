const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },  // Add isAdmin field to distinguish admin users
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
