const {
  createChatRoom,
  findAllChatRooms,
  findChatRoomByID,
  deleteChatRoomByID,
  updateChatRoomByID,
} = require('../models/ChatRooms');

const fetchChatRooms = async (req, res, next) => {
  try {
    const data = await findAllChatRooms();
    res.send(data);
  } catch (err) {
    next(err);
  }
};

const fetchChatRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await findChatRoomByID({ id });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

const registerNewChatRoom = async (req, res, next) => {
  try {
    const data = await createChatRoom(req.body);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

const deleteChatRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteChatRoomByID({ id });
    if (!data) {
      res.status(400).json(`ChatRoom (ID: ${id}) does not exist.`);
    } else {
      res.json(`ChatRoom (ID: ${id}) deleted.`);
    }
  } catch (err) {
    next(err);
  }
};

const updateChatRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateChatRoomByID({ id, payload: req.body });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchChatRooms,
  fetchChatRoom,
  registerNewChatRoom,
  deleteChatRoom,
  updateChatRoom,
};
