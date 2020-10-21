
exports.up = function(knex) {
 return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.text('message').notNullable();
    table.integer('user_id').unsigned().notNullable().index();
    table.integer('chatroom_id').unsigned().notNullable().index();
    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
    table
      .foreign('chatroom_id')
      .references('chatrooms.id')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('messages');
};
