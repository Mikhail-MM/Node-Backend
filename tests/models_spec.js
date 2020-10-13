const { assert } = require('chai');
const { db, TABLES } = require('../db/database');

const {
  createPost,
  findAllPosts,
  findPostByID,
  deletePostByID,
  updatePostByID
} = require("../api/models/posts");

const {
  createTag,
  findAllTags,
  findTagByID,
  deleteTagByID,
  updateTagByID
} = require("../api/models/tags");

const {
  createUser,
  findAllUsers,
  findUserByID,
  deleteUserByID,
  updateUserByID
} = require("../api/models/users");

// TODO: Use a Testing DB for this.

describe('Post Model Methods', () => {
  
  afterEach(() => {
    return db(TABLES.POSTS_TAGS).del()
      .then(() => db(TABLES.POSTS).del())
      .then(() => db(TABLES.TAGS).del())
  });

  it('Creates a new user.', () => {

  });
})