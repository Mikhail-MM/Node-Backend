const { TABLES } = require('../database');
const { generateTestUsers } = require('../factories/generateUsers');

const numUsers = Number(process.env.SEED_NUM_USERS);

exports.seed = async function (knex) {
  await knex(TABLES.USERS).del();
  await knex(TABLES.USERS).insert( 
    await generateTestUsers(numUsers) 
  );
};
