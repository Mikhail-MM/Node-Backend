const { db, TABLES } = require('../../db/database');
const { detectUniqueConstraintError } = require('../../db/parse-errors');

// All of these functions return promises.
const createUser = ({ email, hashed_password }) => {
  return db.insert({ email, hashed_password }).into(TABLES.USERS).returning("*");
}

const findAllUsers = () => {
  return db.select().from(TABLES.USERS);
  // OR knex(TABLES.USERS).select()
}

const findUserByID = ({ id }) => {
  return db.select().from(TABLES.USERS).where({ id: Number(id) });
  // OR knex(TABLES.USERS).where({ id })
}

const deleteUserByID = ({ id }) => {
  return db('users').where({ id: Number(id) }).del();
}

const updateUserByID = ({ id, payload }) => {
  console.log("Get it")
  return db('users').where({ id: Number(id) }).update(payload).returning("*")
    .then(data => data)
    .catch(err => {
      if (detectUniqueConstraintError(err)) {
        // How do we improve this? Regex needs to pick up which "SET" key violated the unique constraint.
        throw new Error("Unique Constraint Violation on User Object")
      }
      throw err;
    });
}

module.exports = {
  createUser,
  findAllUsers,
  findUserByID,
  deleteUserByID,
  updateUserByID,
}

