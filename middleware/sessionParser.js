const session = require('express-session');
const { ioredis } = require('../db/redis');

const RedisStore = require('connect-redis')(session);

const sessionParser = session({
  store: new RedisStore({ client: ioredis }),
  secret: process.env.COOKIE_AND_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
});

module.exports = { sessionParser }