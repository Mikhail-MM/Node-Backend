const { Router } = require("express");

const {
  fetchTags,
  fetchTag,
  registerNewTag,
  deleteTag,
  updateTag,
}= require("../controllers/tags-api");

const TagsRouter = Router();

TagsRouter.get("/:id", fetchTag);
TagsRouter.get("/", fetchTags);

TagsRouter.post("/", registerNewTag);
TagsRouter.put("/:id", updateTag);
TagsRouter.delete("/:id", deleteTag);

module.exports.TagsRouter = TagsRouter;