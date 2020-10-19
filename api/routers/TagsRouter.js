const { Router } = require('express');

const {
  fetchTags,
  fetchTag,
  registerNewTag,
  deleteTag,
  updateTag,

  addPostsTagsRelationship,
} = require('../controllers/tags-api');

const TagsRouter = Router();

TagsRouter.get('/:id', fetchTag);
TagsRouter.get('/', fetchTags);

TagsRouter.post('/posts_tags', addPostsTagsRelationship);
TagsRouter.post('/', registerNewTag);

TagsRouter.put('/:id', updateTag);

// TagsRouter.delete('/posts_tags/:id',)
TagsRouter.delete('/:id', deleteTag);

module.exports.TagsRouter = TagsRouter;
