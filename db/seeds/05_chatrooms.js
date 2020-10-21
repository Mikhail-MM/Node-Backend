const faker = require('faker');

const { TABLES } = require('../database');

const numChatRooms = Number(process.env.SEED_NUM_CHATROOMS);

const payload = Array.from({ length: numChatRooms}, (_) => ({
  name: faker.name.jobType(),
}));

console.log(payload);

exports.seed = async function (knex) {
  await knex(TABLES.CHATROOMS).del();
  await knex(TABLES.CHATROOMS).insert(payload);
};