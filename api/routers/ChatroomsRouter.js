const { Router } = require('express');

const {
  fetchChatRooms,
  fetchChatRoom,
  registerNewChatRoom,
  deleteChatRoom,
  updateChatRoom,
} = require('../controllers/chatrooms-api');

const ChatRoomsRouter = Router();

ChatRoomsRouter.get('/:id', fetchChatRoom);
ChatRoomsRouter.get('/', fetchChatRooms);

ChatRoomsRouter.post('/', registerNewChatRoom);

ChatRoomsRouter.put('/:id', updateChatRoom);

ChatRoomsRouter.delete('/:id', deleteChatRoom);

module.exports.ChatRoomsRouter = ChatRoomsRouter;
