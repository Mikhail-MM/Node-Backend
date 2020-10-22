const { Router } = require('express');

const {
  fetchUsers,
  fetchUser,
  fetchUsersByChatRoom,
  registerNewUser,
  deleteUser,
  updateUser,
  loginUser,
  checkSession,
  logOut
} = require('../controllers/users-api');

const UsersRouter = Router();

UsersRouter.get('/rooms/:id', fetchUsersByChatRoom);
UsersRouter.get('/logout', logOut);
UsersRouter.get('/checkSession', checkSession);
UsersRouter.get('/:id', fetchUser);
UsersRouter.get('/', fetchUsers);

UsersRouter.post('/login', loginUser);
UsersRouter.post('/', registerNewUser);
UsersRouter.put('/:id', updateUser);
UsersRouter.delete('/:id', deleteUser);

module.exports.UsersRouter = UsersRouter;
