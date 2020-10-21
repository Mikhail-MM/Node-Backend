const { TABLES } = require('../database');

const { getRandomInt } = require('../../utils/math');

const numUsers = Number(process.env.SEED_NUM_USERS);
const numChatRooms = Number(process.env.SEED_NUM_CHATROOMS);
const numUsersPerRoom = Number(process.env.SEED_NUM_USERS_PER_ROOM);

const maxFrame = numUsers - numUsersPerRoom;
const payload = Array.from({ length: numChatRooms }, (_, index) => {
  const userIds = Array.from({ length: numUsers}, (_, userIndex) => userIndex + 1);
  const usersInRoom = userIds.splice(
    getRandomInt(0, maxFrame),
    numUsersPerRoom,
  )
  return ({
    chatroom_id: index + 1,
    users: usersInRoom
  });
}).reduce((acc, { chatroom_id, users }) => {
  users.forEach((user_id) => {
    acc.push({
      chatroom_id,
      user_id
    });
  });
  return acc;
}, []);

exports.seed = async function (knex) {
  await knex(TABLES.CHATROOMS_USERS).del();
  await knex(TABLES.CHATROOMS_USERS).insert(payload);
};