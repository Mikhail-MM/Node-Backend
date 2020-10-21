const { db, TABLES } = require('../../db/database');

// All of these functions return promises.
const createMessage = (data) => {
  return db.insert(data).into(TABLES.MESSAGES).returning('*');
};

const findAllMessages = () => {
  return db.select().from(TABLES.MESSAGES);
};

const findMessageByID = ({ id }) => {
  return db
    .select()
    .from(TABLES.MESSAGES)
    .where({ id: Number(id) });
};

const deleteMessageByID = ({ id }) => {
  return db(TABLES.MESSAGES)
    .where({ id: Number(id) })
    .del();
};

const updateMessageByID = ({ id, payload }) => {
  return db(TABLES.MESSAGES)
    .where({ id: Number(id) })
    .update(payload)
    .returning('*');
};

module.exports = {
  createMessage,
  findAllMessages,
  findMessageByID,
  deleteMessageByID,
  updateMessageByID,
};
