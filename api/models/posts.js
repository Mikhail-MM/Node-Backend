const { db, TABLES } = require('../../db/database');

// All of these functions return promises.
const createPost = ({ title, user_id, content }) => {
  return db
    .insert({ title, user_id, content })
    .into(TABLES.POSTS)
    .returning('*');
};

const findAllPosts = () => {
  return db.select(`${TABLES.POSTS}.*`, `${TABLES.USERS}.email as posted_by`).from(TABLES.POSTS).join(TABLES.USERS, `${TABLES.USERS}.id`, `${TABLES.POSTS}.user_id`).orderBy('created_at', 'desc');
};

const findPostByID = ({ id }) => {
  return db
    .select()
    .from(TABLES.POSTS)
    .where({ id: Number(id) });
  // OR knex(TABLES.POSTS).where({ id })
};

const deletePostByID = ({ id }) => {
  return db('posts')
    .where({ id: Number(id) })
    .del();
};

const updatePostByID = ({ id, payload }) => {
  return db('posts')
    .where({ id: Number(id) })
    .update(payload)
    .returning('*');
};

module.exports = {
  createPost,
  findAllPosts,
  findPostByID,
  deletePostByID,
  updatePostByID,
};
