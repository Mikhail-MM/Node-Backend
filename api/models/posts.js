const { db, TABLES } = require('../../db/database');

// All of these functions return promises.
const createPost = ({ title, user_id, content }) => {
  return db
    .insert({ title, user_id, content })
    .into(TABLES.POSTS)
    .returning('*');
};

const findAllPosts = () => {
  return db
    .select(
      `${TABLES.POSTS}.title`,
      `${TABLES.POSTS}.content`,
      `${TABLES.POSTS}.created_at`,
      db.raw(`ARRAY_REMOVE(ARRAY_AGG(${TABLES.TAGS}.title), NULL) as tags`),
      `${TABLES.USERS}.email as posted_by`,
    )
    .from(TABLES.POSTS)
    .leftJoin(
      TABLES.USERS,
      `${TABLES.USERS}.id`,
      `${TABLES.POSTS}.user_id`,
    )
    .leftJoin(
      TABLES.POSTS_TAGS,
      `${TABLES.POSTS_TAGS}.posts_id`,
      `${TABLES.POSTS}.id`,
    )
    .leftJoin(
      TABLES.TAGS,
      `${TABLES.POSTS_TAGS}.tags_id`,
      `${TABLES.TAGS}.id`,
    )
    .groupBy(
      `${TABLES.POSTS}.id`,
      `${TABLES.POSTS_TAGS}.posts_id`,
      `${TABLES.USERS}.email`,
    )
    .orderBy('created_at', 'desc');
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
