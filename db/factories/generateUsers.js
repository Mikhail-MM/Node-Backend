const faker = require('faker');
const { encryptPassword } = require('../../utils/crypto');

const generateTestUsers = async (numUsers = 5) => {

  const hashed_password = await encryptPassword(process.env.TEST_USER_PASSWORD).catch(
    (err) => {
      throw err;
    },
  );

  if (isNaN(Number(numUsers))) {
    throw new Error("Please pass in a number of users to generate.")
  }

  if (Number(numUsers) < 2) {
    return {
      email: faker.internet.email(),
      hashed_password,
    }
  } else {

    return Array.from({ length: numUsers }).map((_el, index) => ({
      email: faker.internet.email(),
      hashed_password,
    }));

  }

};

module.exports = {
  generateTestUsers
}