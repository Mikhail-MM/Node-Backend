const { TABLES } = require('../database');
const { getRandomInt } = require('../../utils/math');

const numPosts = Number(process.env.SEED_NUM_POSTS);
const numTags = Number(process.env.SEED_NUM_USERS);

const numTagsPerPost = Math.floor(numTags / 3);

const makeNumericArray = (num) =>
  Array.from({ length: num }, (_, index) => index + 1);

const post_ids = makeNumericArray(numPosts);

const payload = [];

post_ids.forEach((posts_id) => {
  const tag_ids = makeNumericArray(numTags);
  const removedTags = tag_ids.splice(
    getRandomInt(0, tag_ids.length - numTagsPerPost),
    numTagsPerPost,
  );
  removedTags.forEach((tags_id) => {
    payload.push({
      posts_id,
      tags_id,
    });
  });
});

// Alternate Version
/*
const payload = post_ids
.map((posts_id) => {
  const tag_ids = makeNumericArray(numTags)
  const start = getRandomInt(0, tag_ids.length - numTagsPerPost)
  return tag_ids
    .slice(start, start + numTagsPerPost)
    .map((tags_id) => ({ posts_id, tags_id }))
})
.flat()
*/

exports.seed = async function (knex) {
  await knex(TABLES.POSTS_TAGS).del();
  await knex(TABLES.POSTS_TAGS).insert(payload);
};
