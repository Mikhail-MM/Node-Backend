const process = require('process');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '/.env'),
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// All Indexed Routers
const {
  UsersRouter,
  PostsRouter,
  TagsRouter,
} = require('./api/routers/index');

// Database Configuration
const { db } = require('./db/database');

// Middleware
const { attachRequestID } = require('./middleware/attachRequestID');
const { sessionParser } = require('./middleware/sessionParser');
const { cookieParser } = require('./middleware/cookieParser');

// Separate Logger for Info & Error
const { InfoLogger, ErrorLogger } = require('./logger');

const { APIPort } = require('./config');

// Log Unhandled Exceptions to File
process
  .on('unhandledRejection', ({ message, stack }) => {
    ErrorLogger.error({ message, stack });
    process.exit(1);
  })
  .on('uncaughtException', ({ message, stack }) => {
    ErrorLogger.error({ message, stack });
    process.exit(1);
  });

const app = express();
app.set('trust proxy', true);

// Register Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser);
app.use(attachRequestID);
app.use(sessionParser);

// Routers
app.use('/users', UsersRouter);
app.use('/posts', PostsRouter);
app.use('/tags', TagsRouter);

//Sanity Check
app.get('/', (req, res, next) => {
  res.send('Server is running.');
});

app.get('/test-session', (req, res, next) => {
  InfoLogger.info({ message: 'Ok sir? ' });
  if (!req.session.views) {
    req.session.views = 1;
    req.session.message = 'First Session View.';
  } else if (req.session.views < 20) {
    req.session.views++;
    req.session.message = `Views: ${req.session.views}`;
  } else {
    req.session.destroy();
    return res.send(
      'Your session has been destroyed after 20 views.',
    );
  }
  return res.json({
    requestId: res.locals.requestId,
    message: 'Testing Sessions',
    sessionID: req.sessionID,
    session: req.session,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    sessionExpirationTime: req.session.cookie.maxAge / 1000,
  });
});

// Express Error Handler
app.use('*', function (err, req, res, next) {
  if (err.isAxiosError && err.response) {
    const errorData = {
      stack: err.stack,
      networkMessage: err.message,
      message: err.response.data,
      status: err.response.status,
    };

    ErrorLogger.error(errorData);
    
    res.status(err.response.status).send(err.response.data);
  } else {
    const errorData = {
      message: err.message,
      stack: err.stack,
    };

    ErrorLogger.error(errorData);

    res.status(500).send(err.message);
  }
});

const server = app.listen(APIPort, () => {
  InfoLogger.info(
    `Server running on port ${APIPort} in ${process.env.NODE_ENV} mode.`,
  );
});

// Test DB Connection
db.raw("SELECT tablename FROM pg_tables WHERE schemaname='public'")
  .then((result) => {
    InfoLogger.info(result.rows);
    InfoLogger.info(`Database Queried Successfully`);
  })
  .catch((err) => {
    ErrorLogger.error({
      message: `PG Connection Failed: ${err.message}`,
      stack: err.stack,
    });
    process.exit(1);
  });

module.exports = { server };
