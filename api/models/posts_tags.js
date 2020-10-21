const { db, TABLES } = require('../../db/database');

// Relation is an array of { posts_id: Number, tags_id: Number }
const createPostTagRelationship = (relation) => {
  return db(TABLES.POSTS_TAGS)
    .insert(relation)
    .returning('*');
};

const removePostsTagRelationshipById = ({ id }) => {
  return db(TABLES.POSTS_TAGS).where({ id }).del();
};

module.exports = { createPostTagRelationship, removePostsTagRelationshipById };
