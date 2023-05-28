const User = require('../models/users');

module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.signup_post = async (req, res) => {
  // Destructuring style + create is a promise so need for await
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send('error: User not created');
  }
};

module.exports.login_post = (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send('Error: User not created');
  }
};
