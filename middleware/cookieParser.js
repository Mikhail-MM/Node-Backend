module.exports.cookieParser = require('cookie-parser')(
  process.env.COOKIE_AND_SESSION_SECRET,
);
