
exports.up = async function(knex) {

    await knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('email').notNullable();
      table.string('hashed_password', 60).notNullable();
      table.timestamps();
    });

    await knex.schema.createTable('posts', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().index();
      table.string('title').notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.timestamps();
    });

    await knex.schema.createTable('tags', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.timestamps();
    }),

    await knex.schema.createTable('posts_tags', (table) => {
      table.increments();
      table.integer('posts_id').unsigned().notNullable().index();
      table.integer('tags_id').unsigned().notNullable().index();
      table.foreign('posts_id').references('posts.id').onDelete('CASCADE');
      table.foreign('tags_id').references('tags.id').onDelete('CASCADE')
    })

};

exports.down = async function(knex) {
  await knex.schema.dropTable('posts_tags');
  await knex.schema.dropTable('posts');
  await knex.schema.dropTable('tags');
  await knex.schema.dropTable('users');
};
