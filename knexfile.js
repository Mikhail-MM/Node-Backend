const path = require('path');

require('dotenv').config({ 
  path: path.join(__dirname, '/.env')
});

const { InfoLogger , ErrorLogger } = require('./logger');

module.exports = {
  client: 'postgresql',
  connection: {
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    databse: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  },
  migrations: {
    directory: path.join(__dirname, '/db/migrations'),
  },
  seeds: {
    directory: path.join(__dirname, '/db/seeds')
  },
  afterConnect: (conn, done) => {
    conn.query('SELECT 1 + 1 AS result', (err) => {
      if (err) {
        const { message } = err;
        ErrorLogger.error(`Error Establishing PG Connection: ${message}`);
      } else {
        InfoLogger.info("PG Connection Established.");
      }
      done(err, conn);
    })
  }
}