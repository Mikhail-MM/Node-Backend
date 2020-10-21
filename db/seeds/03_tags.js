const faker = require('faker');
const { TABLES } = require('../database');

const numTags = Number(process.env.SEED_NUM_TAGS);

let payload = [];

while (payload.length < numTags) {
  const tag = faker.lorem.word().toUpperCase();
  if (!payload.includes(tag)) 
    payload.push({ title: tag });
}

exports.seed = async function (knex) {
  await knex(TABLES.TAGS).del();
  await knex(TABLES.TAGS).insert(payload);
};
