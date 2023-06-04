const isEmail = require('validator/lib/isEmail');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => isEmail(value),
      message: 'Please enter a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
});

// Run a function before doc saved to MongoDB
// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Create a model from the created Schema above
const User = mongoose.model('user', userSchema);

module.exports = User;
