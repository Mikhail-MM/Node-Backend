const chai = require('chai');
const chaiHttp = require('chai-http');

const { server } = require('../server');
const { db, TABLES } = require('../db/database');

const { assert } = chai;
const { generateTestUsers } = require('../db/factories/generateUsers');

const {
  createUser,
  findAllUsers,
  findUserByID,
  deleteUserByID,
  updateUserByID,
} = require('../api/models/users');
const { expect } = require('chai');
const { encryptPassword } = require('../utils/crypto');

chai.use(chaiHttp);

const clearUsersDatabase = async () => {
  await db(TABLES.USERS).del();
};

const newUserAssertions = (data) => {
  assert.property(data, 'id');
  assert.property(data, 'email');
  assert.property(data, 'created_at');
  assert.property(data, 'updated_at');
}

describe('Users - Model Controllers', () => {
  before(async () => {
    await clearUsersDatabase();
    userData = await generateTestUsers(1);
  });

  it('[Model Controller] Saves a single user to the database', async () => {
    const newUser = await createUser(userData);
    newUserAssertions(newUser)
    assert.property(newUser, "hashed_password");
  });

  it('[API Controller] Saves a single user to the database', async () => {
    const email = 'test1@bogus.com';
    const password = 'test_data';
    const response = await chai.request(server)
      .post('/users')
      .send({ email, password });
    newUserAssertions(response.body);
    assert.notProperty(response.body, "hashed_password");
  });

  after(async () => {
    await clearUsersDatabase();
  });
});
