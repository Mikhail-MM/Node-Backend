exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email').notNullable();
    table.string('hashed_password', 60).notNullable();
    table.timestamps(true, true);
    table.unique('email');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
