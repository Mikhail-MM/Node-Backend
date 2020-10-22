const { Router } = require('express');

const {
  fetchMessages,
  fetchMessage,
  fetchMessagesByRoomId,
  registerNewMessage,
  deleteMessage,
  updateMessage,
} = require('../controllers/Messages-api');

const MessagesRouter = Router();

MessagesRouter.get('/rooms/:id', fetchMessagesByRoomId);
MessagesRouter.get('/:id', fetchMessage);
MessagesRouter.get('/', fetchMessages);

MessagesRouter.post('/', registerNewMessage);

MessagesRouter.put('/:id', updateMessage);

MessagesRouter.delete('/:id', deleteMessage);

module.exports.MessagesRouter = MessagesRouter;
