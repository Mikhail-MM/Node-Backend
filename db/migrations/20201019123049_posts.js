exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().index();
    table.string('title').notNullable();
    table.text('content').notNullable();
    // table.boolean('is_html').defaultTo(false);
    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts');
};
