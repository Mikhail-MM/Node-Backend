const { knexfile } = require('../config');
const knex = require('knex');

module.exports.TABLES = {
  USERS: 'users',
  POSTS: 'posts',
  TAGS: 'tags',
  POSTS_TAGS: 'posts_tags',
  CHATROOMS: 'chatrooms',
  MESSAGES: 'messages',
  CHATROOMS_USERS: 'chatrooms_users'
};

module.exports.db = knex(knexfile);
