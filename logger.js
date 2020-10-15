const path = require('path');
const {
  createLogger,
  transports,
  format: { combine, timestamp, json },
} = require('winston');
require('winston-daily-rotate-file');

const commonFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  json(),
);

const logPath = path.join(__dirname, 'logs');

const getRotationConfig = (filename) => {
  return {
    filename: `${logPath}/${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '50m',
    maxFiles: '14d',
  };
};

const InfoLogger = createLogger({
  format: commonFormat,
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile(getRotationConfig('info')),
  ],
});

const ErrorLogger = createLogger({
  format: commonFormat,
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile(getRotationConfig('error')),
  ],
});

InfoLogger.stream = {
  write: (message, encoding) => {
    InfoLogger.info(message);
  },
};

ErrorLogger.stream = {
  write: (message, encoding) => {
    ErrorLogger.error(message);
  },
};

module.exports = { InfoLogger, ErrorLogger };
