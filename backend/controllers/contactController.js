const Contact = require('../models/Contact');

// ایجاد مخاطب جدید
exports.createContact = async (req, res) => {
  const { name, phone, email } = req.body;
  const newContact = new Contact({
    user: req.user.userId,
    name,
    phone,
    email
  });

  await newContact.save();
  res.status(201).json({ message: 'Contact created successfully', contact: newContact });
};

// دریافت لیست مخاطبین کاربر
exports.getContacts = async (req, res) => {
  const contacts = await Contact.find({ user: req.user.userId });
  res.json(contacts);
};
