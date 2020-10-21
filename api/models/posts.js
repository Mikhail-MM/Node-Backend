const { db, TABLES } = require('../../db/database');
// All of these functions return promises.
const createPost = ({ title, user_id, content, tags }) => {
  return db
    .transaction((trx) => {
      return trx
        .insert({ title, user_id, content })
        .into(TABLES.POSTS)
        .returning('*')
        .then(([insertedPost]) => {
          const payload = tags.map((tags_id) => ({
            posts_id: insertedPost.id,
            tags_id,
          }));
          return trx
            .insert(payload)
            .into(TABLES.POSTS_TAGS)
            .returning('*')
            .then((insertedTags) => {
              return {
                insertedPost,
                insertedTags,
              };
            });
        });
    })
    .then(({ insertedPost }) => {
      return findPostByID({ id: insertedPost.id });
    });
};

const findAllPosts = () => {
  return db
    .select(
      `${TABLES.POSTS}.title`,
      `${TABLES.POSTS}.content`,
      `${TABLES.POSTS}.created_at`,
      db.raw(`JSON_AGG(${TABLES.TAGS}) as tags`),
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
    .orderBy('created_at', 'desc')
    .then((data) => {
      // strip out nulls
      return data.map((datum) => {
        const { tags } = datum;
        if (!tags[0]) {
          return { ...datum, tags: [] };
        }
        return datum;
      });
    });
};

const findPostByID = ({ id }) => {
  return db
    .select(
      `${TABLES.POSTS}.*`,
      `${TABLES.USERS}.email as posted_by`,
      db.raw(`JSON_AGG(${TABLES.TAGS}) as tags`),
    )
    .from(TABLES.POSTS)
    .where({ [`${TABLES.POSTS}.id`]: Number(id) })
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
    .groupBy(`${TABLES.POSTS}.id`, `${TABLES.USERS}.email`)
    .then(([datum]) => datum);
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
