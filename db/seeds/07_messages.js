const faker = require('faker');

const { TABLES } = require('../database');

const { getRandomInt } = require('../../utils/math');

const numUsers = Number(process.env.SEED_NUM_USERS);
const numChatRooms = Number(process.env.SEED_NUM_CHATROOMS);
const numMessages = Number(process.env.SEED_NUM_MESSAGES_PER_ROOM);

/*

  TODO: Authenticated Seed
  (IE Only participants will have messages in respective chat rooms);

  const rooms = Array.from({ length: numChatRooms }, async (_, index) => {
    let messageCount;
    while (messageCount < numMessages) {

    }
  });
  

*/


const payload = Array.from({ length: numMessages }, () => ({
  chatroom_id: getRandomInt(1, numChatRooms),
  user_id: getRandomInt(1, numUsers),
  message: faker.random.words(getRandomInt(8, 20)),
}));

console.log(payload);

exports.seed = async function (knex) {
  await knex(TABLES.MESSAGES).del();
  await knex(TABLES.MESSAGES).insert(payload)
}