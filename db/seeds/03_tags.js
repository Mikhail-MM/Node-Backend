const faker = require('faker');
const { TABLES } = require('../database');

const numTags = Number(process.env.SEED_NUM_TAGS);

const payload = Array.from({ length: numTags }).map(() => ({
  title: faker.lorem.word().toUpperCase(),
}));

exports.seed = async function (knex) {
  await knex(TABLES.TAGS).del();
  await knex(TABLES.TAGS).insert(payload);
};
