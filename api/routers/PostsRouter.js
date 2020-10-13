const { Router } = require("express");

const {
  fetchPosts,
  fetchPost,
  registerNewPost,
  deletePost,
  updatePost,
}= require("../controllers/Posts-api");

const PostsRouter = Router();

PostsRouter.get("/:id", fetchPost);
PostsRouter.get("/", fetchPosts);

PostsRouter.post("/", registerNewPost);
PostsRouter.put("/:id", updatePost);
PostsRouter.delete("/:id", deletePost);

module.exports.PostsRouter = PostsRouter;