const process = require('process');
const { db } = require('./db/database');

require('dotenv').config({ 
  path: path.join(__dirname, '/.env')
});

const { InfoLogger , ErrorLogger } = require('./logger');

InfoLogger.info({ message: `Server Initialized` });

process.on('unhandledRejection', ({ message, stack }, promise) => {
  ErrorLogger.error({ message, stack });
  process.exit(1);
}).on('uncaughtException', ({ message, stack }) => {
  ErrorLogger.error({ message, stack });
  process.exit(1);
});

db.raw("SELECT tablename FROM pg_tables WHERE schemaname='public'").then(result => {
  InfoLogger.info(`Database Queried Successfully`)
}).catch(err => ErrorLogger.error({ message: err.message, stack: err.stack }));
