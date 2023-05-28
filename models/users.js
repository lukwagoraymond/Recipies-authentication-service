const { isEmail } = require('validator');
const mongoose = require('mongoose');

// Create user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
});

// Create a model from the created Schema above
const User = mongoose.model('user', userSchema);

module.exports = User;
