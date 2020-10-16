const bcrypt = require('bcrypt');

function encryptPassword(password, saltRounds = 10) {
  if (!password) {
    throw new Error("No Password Provided to encrypPassword()");
  }
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else resolve(hash);
    })
  }) 
}

module.exports = { encryptPassword }