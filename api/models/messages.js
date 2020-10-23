const { db, TABLES } = require('../../db/database');

// All of these functions return promises.
const createMessage = ({ message, chatroom_id, user_id }) => {
  return db
    .insert({ message, chatroom_id, user_id })
    .into(TABLES.MESSAGES)
    .returning('*')
    .then(([message]) => message);
};

const findAllMessages = () => {
  return db.select().from(TABLES.MESSAGES);
};

const findMessagesByRoomId = ({ id }) => {
  return db
    .select(
      `${TABLES.MESSAGES}.id`,
      `${TABLES.MESSAGES}.created_at`,
      `${TABLES.MESSAGES}.message`,
      `${TABLES.MESSAGES}.created_at`,
      `${TABLES.USERS}.email as created_by`,
    )
    .from(TABLES.MESSAGES)
    .join(
      TABLES.USERS,
      `${TABLES.USERS}.id`,
      `${TABLES.MESSAGES}.user_id`,
    )
    .where({
      [`${TABLES.MESSAGES}.chatroom_id`]: id,
    })
    .orderBy(`${TABLES.MESSAGES}.created_at`);
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
  findMessagesByRoomId,
};
