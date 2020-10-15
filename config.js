const path = require('path');
const knexfile = require('./knexfile');

require('dotenv').config({
  path: path.join(__dirname, '/.env'),
});

module.exports = {
  knexfile,
  APIPort: 7000,
};
