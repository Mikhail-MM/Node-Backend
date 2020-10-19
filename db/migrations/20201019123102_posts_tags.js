exports.up = function (knex) {
  return knex.schema.createTable('posts_tags', (table) => {
    table.increments();
    table.integer('posts_id').unsigned().notNullable().index();
    table.integer('tags_id').unsigned().notNullable().index();
    table.unique('posts_id');
    table.unique('tags_id');
    table
      .foreign('posts_id')
      .references('posts.id')
      .onDelete('CASCADE');
    table
      .foreign('tags_id')
      .references('tags.id')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts_tags');
};
