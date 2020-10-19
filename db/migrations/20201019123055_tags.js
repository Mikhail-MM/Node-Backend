exports.up = function (knex) {
  return knex.schema.createTable('tags', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.timestamps(true, true);
    table.unique('title');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tags');
};
