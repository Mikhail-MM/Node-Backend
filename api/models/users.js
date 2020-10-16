const { db, TABLES } = require('../../db/database');

// All of these functions return promises.
const createUser = ({ email, hashed_password }) => {
  console.log({ email, hashed_password })
  return db
    .insert({ email, hashed_password })
    .into(TABLES.USERS)
    .returning('*');
};

const findAllUsers = () => {
  return db.select().from(TABLES.USERS);
  // OR knex(TABLES.USERS).select()
};

const findUserByID = ({ id }) => {
  return db
    .select()
    .from(TABLES.USERS)
    .where({ id: Number(id) });
  // OR knex(TABLES.USERS).where({ id })
};

const deleteUserByID = ({ id }) => {
  return db('users')
    .where({ id: Number(id) })
    .del();
};

const updateUserByID = ({ id, payload }) => {
  return db('users')
    .where({ id: Number(id) })
    .update(payload)
    .returning('*');
};

module.exports = {
  createUser,
  findAllUsers,
  findUserByID,
  deleteUserByID,
  updateUserByID,
};
