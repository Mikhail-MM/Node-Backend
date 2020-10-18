const {
  createTag,
  findAllTags,
  findTagByID,
  deleteTagByID,
  updateTagByID,
} = require('../models/tags');

const fetchTags = async (req, res, next) => {
  try {
    const data = await findAllTags();
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

const fetchTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await findTagByID({ id });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

const registerNewTag = async (req, res, next) => {
  try {
    const data = await createTag(req.body);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteTagByID({ id });
    if (!data) {
      res
        .status(400)
        .json(`Tag (ID: ${id}) does not exist.`);
    } else {
      res.json(`Tag (ID: ${id}) deleted.`);
    }
  } catch (err) {
    next(err);
  }
};

const updateTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateTagByID({ id, payload: req.body });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchTags,
  fetchTag,
  registerNewTag,
  deleteTag,
  updateTag,
};
