const process = require("process");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "/.env"),
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// All Indexed Routers
const { UsersRouter, PostsRouter, TagsRouter } = require('./api/routers/index');

// Database Configuration
const { db } = require("./db/database");

// All Request Have a Unique ID for Logging Purposes
const { attachRequestID } = require("./utils/middleware/attachRequestID");

// Separate Logger for Info & Error
const { InfoLogger, ErrorLogger } = require("./logger");

const { APIPort } = require("./config");


// Log Unhandled Exceptions to File
process
  .on("unhandledRejection", ({ message, stack }, promise) => {
    ErrorLogger.error({ message, stack });
    process.exit(1);
  })
  .on("uncaughtException", ({ message, stack }) => {
    ErrorLogger.error({ message, stack });
    process.exit(1);
  });

const app = express();
app.set('trust proxy', true);

// Register Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
app.use("*", attachRequestID);

// Routers
app.use('/users', UsersRouter);
app.use('/posts', PostsRouter);
app.use('/tags', TagsRouter);

//Sanity Check
app.get("/", (req, res, next) => {
  res.send("Server is running.");
});


// Express Error Handler
app.use("*", function (err, req, res, next) {
  if (err.isAxiosError && err.response) {
    const errorData = {
      stack: err.stack,
      networkMessage: err.message,
      message: err.response.data,
      status: err.response.status,
    };

    ErrorLogger.error(errorData);

    res.status(err.response.status).json({ errorData });
  } else {
    const errorData = {
      message: err.message,
      stack: err.stack,
    };

    ErrorLogger.error(errorData);

    res.status(500).json({ errorData });
  }
});

app.listen(APIPort, () => {
  InfoLogger.info(
    `Server running on port ${APIPort} in ${process.env.NODE_ENV} mode.`
  );
});

// Test DB Connection
db.raw("SELECT tablename FROM pg_tables WHERE schemaname='public'")
  .then((result) => {
    InfoLogger.info(result.rows);
    InfoLogger.info(`Database Queried Successfully`);
  })
  .catch((err) =>
    ErrorLogger.error({ message: err.message, stack: err.stack })
  );
