const bcrypt = require('bcrypt');

const {
  createUser,
  findAllUsers,
  findUserByID,
  findUsersByLookup,
  deleteUserByID,
  updateUserByID,
} = require('../models/users');

const { encryptPassword } = require('../../utils/crypto');

const fetchUsers = async (req, res, next) => {
  try {
    const data = await findAllUsers();
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

const fetchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await findUserByID({ id });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

const registerNewUser = async (req, res, next) => {
  try {
    const { password, ...userData } = req.body;
    const [userExists] = await findUsersByLookup({
      email: req.body.email,
    });
    if (userExists) {
      return res
        .status(409)
        .send('A user already exists with this email address.');
    }
    const { hashed_password, ...newUserData } = await createUser({
      hashed_password: await encryptPassword(password),
      ...userData,
    });
    res.send(newUserData);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteUserByID({ id });
    if (!data) {
      res
        .status(400)
        .send(`User (ID: ${id}) does not exist.` );
    } else {
      res.send(`User (ID: ${id}) deleted.`);
    }
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateUserByID({ id, payload: req.body });
    res.json({ data });
  } catch (err) {
    console.log('Check err');
    // TODO: Unique Constraint Validation Errors.
    console.log(err);
    console.log(err.code);
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send('Missing Credentials.');
    }
    const [userExists] = await findUsersByLookup({
      email: req.body.email,
    });
    if (!userExists) {
      return res
        .status(400)
        .send(`Account '${email}' does not exist`);
    }
    const { hashed_password, id } = userExists;
    const match = await bcrypt.compare(password, hashed_password);

    if (!match) {
      return res.status(403).send("Incorrect Password.");
    }

    req.session.userId = id;
    console.log(req.session);
    res.json({ id });
  } catch (err) {}
};

const checkSession = async (req, res, next) => {
  console.log("Checking Session.");
  console.log(req.session);
  if (req.session.userId) {
    res.json({ userId: req.session.userId });
  } else {
    res.json({ isAuthenticated: false })
  }
}

module.exports = {
  fetchUsers,
  fetchUser,
  registerNewUser,
  deleteUser,
  updateUser,
  loginUser,
  checkSession
};
