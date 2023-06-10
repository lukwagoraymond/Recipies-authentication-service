const jwt = require('jsonwebtoken');
const User = require('../models/users');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  const errors = { email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }
  // Deal with un-existant email
  if (err.message.includes('incorrect email')) {
    errors.email = 'That Email is not Registered';
  }

  // Deal with wrong password
  if (err.message.includes('incorrect password')) {
    errors.password = 'Wrong Password: Input Correct One';
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60; // Measured in seconds
// Create JWT Tokens
const createToken = (id) => jwt.sign({ id }, '2nd Arg is a SECRET', {
  expiresIn: maxAge,
});

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    // eslint-disable-next-line no-underscore-dangle
    const token = createToken(user._id);
    res.cookie('cookieName', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // eslint-disable-next-line no-underscore-dangle
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.authLogin(email, password);
    // eslint-disable-next-line no-underscore-dangle
    const token = createToken(user._id);
    res.cookie('cookieName', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // eslint-disable-next-line no-underscore-dangle
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.clearCookie('cookieName');
  res.redirect('/');
};
