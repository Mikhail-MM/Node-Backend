const { TABLES } = require('../database');
const { generateTestUsers } = require('../../tests/data/generateUsers');

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
  await knex(TABLES.USERS).insert( await generateTestUsers() );
};
