const process = require('process');
const Redis = require('ioredis');

const { ErrorLogger, InfoLogger } = require('../logger');

const redis = new Redis({
  host: process.env.DATABASE_HOST,
  maxRetriesPerRequest: 20,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redis.on('connect', () => {
  InfoLogger.info("Redis Connection Initialized.")
})

redis.on("disconnect", () => {
  InfoLogger.info("Redis Connection Destroyed.")
})
redis.on('error', ({ message, ...rest}) => {
  ErrorLogger.error({ message: `Redis Connection Failed: ${message}`, ...rest});
})

module.exports = { redis }