exports.up = function (knex) {
  return knex.schema.createTable('posts_tags', (table) => {
    table.integer('posts_id').unsigned().notNullable().index();
    table.integer('tags_id').unsigned().notNullable().index();
    table
      .foreign('posts_id')
      .references('posts.id')
      .onDelete('CASCADE');
    table
      .foreign('tags_id')
      .references('tags.id')
      .onDelete('CASCADE');
    table.primary(['posts_id', 'tags_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts_tags');
};
