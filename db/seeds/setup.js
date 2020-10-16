const { TABLES } = require('../database');
const { encryptPassword } = require('../../utils/crypto');

const generateUsers = async (numUsers = 5) => {
  const hashed_password = await encryptPassword('test_data').catch(
    (err) => {
      throw err;
    },
  );
  return Array.from({ length: numUsers }).map((_el, index) => ({
    email: `test+${index}@dummyemail.com`,
    hashed_password,
  }));
};

const postsData = [
  {
    title: 'Are you kidding me?',
    content: 'No way.',
    users_id: 2,
  },
];

const tagsData = [
  {
    title: 'Complaints',
  },
];

exports.seed = async function (knex) {
  await knex(TABLES.USERS).del();
  await knex(TABLES.USERS).insert( await generateUsers() );
};
