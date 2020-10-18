const { db, TABLES } = require('../../db/database');

// All of these functions return promises.
const createUser = ({ email, hashed_password }) => {
  return db.insert({ email, hashed_password })
    .into(TABLES.USERS)
    .returning('*')
    .then((data) => {
      if (!data.length) {
        throw new Error('Error adding user to the Database');
      }
      return data[0];
    });
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

const findUsersByLookup = (lookup) => {
  return db
    .select()
    .from(TABLES.USERS)
    .where(lookup);
}

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
  findUsersByLookup,
};
