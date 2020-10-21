exports.up = function (knex) {
  return knex.schema.createTable('chatrooms_users', (table) => {
    table.integer('chatroom_id').unsigned().notNullable().index();
    table.integer('user_id').unsigned().notNullable().index();
    table
      .foreign('chatroom_id')
      .references('chatrooms.id')
      .onDelete('CASCADE');
    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
    table.primary(['chatroom_id', 'user_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('chatrooms_users');
};
