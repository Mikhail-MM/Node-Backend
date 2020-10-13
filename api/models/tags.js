const { db, TABLES } = require('../../db/database');
const { detectUniqueConstraintError } = require('../../db/parse-errors');

// All of these functions return promises.
const createTag = (data) => {
  return db.insert(data).into(TABLES.TAGS).returning("*");
}

const findAllTags = () => {
  return db.select().from(TABLES.TAGS);
}

const findTagByID = ({ id }) => {
  return db.select().from(TABLES.TAGS).where({ id: Number(id) });
}

const deleteTagByID = ({ id }) => {
  return db(TABLES.TAGS).where({ id: Number(id) }).del();
}

const updateTagByID = ({ id, payload }) => {
  return db(TABLES.TAGS).where({ id: Number(id) }).update(payload).returning("*")
}

module.exports = {
  createTag,
  findAllTags,
  findTagByID,
  deleteTagByID,
  updateTagByID,
}

