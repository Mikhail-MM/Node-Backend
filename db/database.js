const { knexfile } = require('../config');
const knex = require('knex');

module.exports.TABLES = {
  USERS: 'users',
  POSTS: 'posts',
  TAGS: 'tags',
  POSTS_TAGS: 'posts_tags',
};

module.exports.db = knex(knexfile);
