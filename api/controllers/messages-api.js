const {
  createMessage,
  findAllMessages,
  findMessageByID,
  deleteMessageByID,
  updateMessageByID,
} = require('../models/Messages');

const fetchMessages = async (req, res, next) => {
  try {
    const data = await findAllMessages();
    res.send(data);
  } catch (err) {
    next(err);
  }
};

const fetchMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await findMessageByID({ id });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

const registerNewMessage = async (req, res, next) => {
  try {
    const data = await createMessage(req.body);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteMessageByID({ id });
    if (!data) {
      res.status(400).json(`Message (ID: ${id}) does not exist.`);
    } else {
      res.json(`Message (ID: ${id}) deleted.`);
    }
  } catch (err) {
    next(err);
  }
};

const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateMessageByID({ id, payload: req.body });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchMessages,
  fetchMessage,
  registerNewMessage,
  deleteMessage,
  updateMessage,
};
