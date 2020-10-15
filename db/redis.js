const process = require('process');
const Redis = require('ioredis');

const { ErrorLogger, InfoLogger } = require('../logger');

const ioredis = new Redis({
  host: process.env.DATABASE_HOST,
  maxRetriesPerRequest: 20,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

ioredis.on('connect', () => {
  InfoLogger.info("Redis Connection Initialized.")
});

ioredis.on("disconnect", () => {
  InfoLogger.info("Redis Connection Destroyed.")
});

ioredis.on('error', ({ message, ...rest}) => {
  ErrorLogger.error({ message: `Redis Connection Failed: ${message}`, ...rest});
});

module.exports = { ioredis }