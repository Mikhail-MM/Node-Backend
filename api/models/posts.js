const { db, TABLES } = require('../../db/database');
const { detectUniqueConstraintError } = require('../../db/parse-errors');

// All of these functions return promises.
const createPost = ({ title, user_id }) => {
  return db.insert({ title, user_id }).into(TABLES.POSTS).returning("*");
}

const findAllPosts = () => {
  return db.select().from(TABLES.POSTS);
  // OR knex(TABLES.POSTS).select()
}

const findPostByID = ({ id }) => {
  return db.select().from(TABLES.POSTS).where({ id: Number(id) });
  // OR knex(TABLES.POSTS).where({ id })
}

const deletePostByID = ({ id }) => {
  return db('posts').where({ id: Number(id) }).del();
}

const updatePostByID = ({ id, payload }) => {
  return db('posts').where({ id: Number(id) }).update(payload).returning("*")
}

module.exports = {
  createPost,
  findAllPosts,
  findPostByID,
  deletePostByID,
  updatePostByID,
}

