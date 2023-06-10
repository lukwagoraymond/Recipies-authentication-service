// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// authenticates if user has permission to access particular resource
const requireAuth = (req, res, next) => {
  const token = req.cookies.cookieName;
  if (token) {
    jwt.verify(token, '2nd Arg is a SECRET', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// Get Current User
const currentUser = (req, res, next) => {
  const token = req.cookies.cookieName;
  if (token) {
    jwt.verify(token, '2nd Arg is a SECRET', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        const user = await User.findById(decodedToken.id);
        // inject user object into views4front-end
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, currentUser };
