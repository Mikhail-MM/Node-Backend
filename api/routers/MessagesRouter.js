const { Router } = require('express');

const {
  fetchMessages,
  fetchMessage,
  registerNewMessage,
  deleteMessage,
  updateMessage,
} = require('../controllers/Messages-api');

const MessagesRouter = Router();

MessagesRouter.get('/:id', fetchMessage);
MessagesRouter.get('/', fetchMessages);

MessagesRouter.post('/', registerNewMessage);

MessagesRouter.put('/:id', updateMessage);

MessagesRouter.delete('/:id', deleteMessage);

module.exports.MessagesRouter = MessagesRouter;
