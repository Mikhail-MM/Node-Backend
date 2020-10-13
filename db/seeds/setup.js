const bcrypt = require('bcrypt');
const plaintextPW = 'my_plain_text_robot_password';

const getHashedPassword = () => new Promise((resolve, reject) => {
  bcrypt.hash(plaintextPW, 10, function(err, hash) {
    if (err) reject(err)
    resolve(hash)
  });
})

const usersData = (password) => ([
  {
    email: 'test1@bonkers.com',
    hashed_password: password
  },
  { 
    email: 'test2@bonkers.com',
    hashed_password: password
  },
  {
    email: 'test3@bonkers.com',
    hashed_password: password
  }
])

const postsData = [
  {
    title: "Are you kidding me?",
    content: "No way.",
    users_id: 2
  }
]

const tagsData = [
  {
    'title': "Complaints"
  }
]


exports.seed = async function(knex) {
  await knex('users').del();
  const pw = await getHashedPassword();
  await knex('users').insert(usersData(pw));
} 