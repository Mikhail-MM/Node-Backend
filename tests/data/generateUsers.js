const { encryptPassword } = require('../../utils/crypto');

const generateTestUsers = async (numUsers = 5) => {

  const hashed_password = await encryptPassword('test_data').catch(
    (err) => {
      throw err;
    },
  );

  if (isNaN(Number(numUsers))) {
    throw new Error("Please pass in a number of users to generate.")
  }

  if (Number(numUsers) < 2) {
    return {
      email: `test+0@dummyemail.com`,
      hashed_password,
    }
  } else {

    return Array.from({ length: numUsers }).map((_el, index) => ({
      email: `test+${index}@dummyemail.com`,
      hashed_password,
    }));

  }

};

module.exports = {
  generateTestUsers
}