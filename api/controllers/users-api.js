const {
  createUser,
  findAllUsers,
  findUserByID,
  deleteUserByID,
  updateUserByID
} = require("../models/users");

const fetchUsers = async (req, res, next) => {
  try {
    const data = await findAllUsers();
    res.json({ data });
  } catch(err) {
    next(err);
  }
}

const fetchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await findUserByID({ id });
    res.json({ data });
  } catch(err) {
    next(err)
  }
}

const registerNewUser = async (req, res, next) => {
  try {
    const data = await createUser({ });
    res.json({ data })
  } catch(err) {
    next(err);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteUserByID({ id });
    if (!data) {
      res.status(400).json({ message: `User (ID: ${id}) does not exist.`});
    } else {
      res.json({ message: `User (ID: ${id}) deleted.`})
    }
  } catch(err) {
    next(err);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateUserByID({ id, payload: req.body });
    res.json({ data });
  } catch(err) {
    console.log("Check err");
    console.log(err);
    console.log(err.code);
    next(err);
  }
}

module.exports = {
  fetchUsers,
  fetchUser,
  registerNewUser,
  deleteUser,
  updateUser,
}