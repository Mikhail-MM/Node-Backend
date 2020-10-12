const bcrypt = require('bcrypt');
const plaintextPW = 'my_plain_text_robot_password';

function generateHashedString(string) {
  return bcrypt.hash(string, 10, (err, hash) => {
    if (err) {
      return console.log(err);
    } else return hash;
  })
}

const placeholderPassword = generateHashedString(plaintextPW);

const usersData = [
  {
    email: 'test1@bonkers.com',
    hashed_password: placeholderPassword
  },
  {
    email: 'test1@bonkers.com',
    hashed_password: placeholderPassword
  },
  {
    email: 'test1@bonkers.com',
    hashed_password: placeholderPassword
  }
]

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


exports.seed = function(knex) {
  Promise.all([
    knex('users').del(),
    knex('posts').del(),
    knex('tags').del(),
  ]).then(() => {
    Promise.all([
      knex('users').insert(usersData),
      knex('posts').insert(postsData),
      knex('tags').insert(tagsData),
    ])
  })
} 