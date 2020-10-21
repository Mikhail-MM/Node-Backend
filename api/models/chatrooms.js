const { db, TABLES } = require('../../db/database');

// All of these functions return promises.
const createChatRoom = (data) => {
  return db.insert(data).into(TABLES.CHATROOMS).returning('*');
};

const findAllChatRooms = () => {
  return db.select().from(TABLES.CHATROOMS);
};

const findChatRoomByID = ({ id }) => {
  return db
    .select()
    .from(TABLES.CHATROOMS)
    .where({ id: Number(id) });
};

const deleteChatRoomByID = ({ id }) => {
  return db(TABLES.CHATROOMS)
    .where({ id: Number(id) })
    .del();
};

const updateChatRoomByID = ({ id, payload }) => {
  return db(TABLES.CHATROOMS)
    .where({ id: Number(id) })
    .update(payload)
    .returning('*');
};

module.exports = {
  createChatRoom,
  findAllChatRooms,
  findChatRoomByID,
  deleteChatRoomByID,
  updateChatRoomByID,
};
