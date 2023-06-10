// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };
