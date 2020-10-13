const uuid = require('uuid');

module.exports.attachRequestID = (req, res, next) => {
  res.locals.requestId = uuid.v4();
  next();
}