const { db, TABLES } = require('../../db/database');

const createPostTagRelationship = ({ posts_id, tags_id }) => {
  // TODO: Handle Multiple (Array of Objects)
  return db(TABLES.POSTS_TAGS)
    .insert({ posts_id, tags_id })
    .returning('*');
};

const removePostsTagRelationship = ({ id }) => {
  return db(TABLES.POSTS_TAGS).where({ id }).del();
};

export { createPostTagRelationship, removePostsTagRelationship };
