const {
  createPost,
  findAllPosts,
  findPostByID,
  deletePostByID,
  updatePostByID,
} = require('../models/posts');

const fetchPosts = async (req, res, next) => {
  try {
    const data = await findAllPosts();
    res.send( data );
  } catch (err) {
    next(err);
  }
};

const fetchPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await findPostByID({ id });
    res.send( data );
  } catch (err) {
    next(err);
  }
};

const registerNewPost = async (req, res, next) => {
  try {
    const { user_id } = req.session;
    const data = await createPost({ ...req.body, user_id});
    res.send( data );
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deletePostByID({ id });
    if (!data) {
      res
        .status(400)
        .json(`Post (ID: ${id}) does not exist.`);
    } else {
      res.json(`Post (ID: ${id}) deleted.`);
    }
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updatePostByID({ id, payload: req.body });
    res.send( data );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchPosts,
  fetchPost,
  registerNewPost,
  deletePost,
  updatePost,
};
