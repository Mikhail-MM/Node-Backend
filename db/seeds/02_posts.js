const faker = require('faker');
const { TABLES } = require('../database');

const { getRandomInt } = require('../../utils/math');

const numPosts = Number(process.env.SEED_NUM_POSTS);
const numUsers = Number(process.env.SEED_NUM_USERS);

const payload = Array.from({ length: numPosts }).map(() => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(),
  user_id: getRandomInt(1, numUsers),
}));

console.log(payload);

exports.seed = async function (knex) {
  await knex(TABLES.POSTS).del();
  await knex(TABLES.POSTS).insert(payload);
};
