const { Router } = require('express');

const {
  fetchUsers,
  fetchUser,
  registerNewUser,
  deleteUser,
  updateUser,
} = require('../controllers/users-api');

const UsersRouter = Router();

UsersRouter.get('/:id', fetchUser);
UsersRouter.get('/', fetchUsers);

UsersRouter.post('/', registerNewUser);
UsersRouter.put('/:id', updateUser);
UsersRouter.delete('/:id', deleteUser);

module.exports.UsersRouter = UsersRouter;
