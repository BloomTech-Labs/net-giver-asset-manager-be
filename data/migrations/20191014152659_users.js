
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('id');
      tbl.string('email').notNullable().unique();
      tbl.string('password').notNullable();
    })
    .createTable('history', tbl => {
      tbl.increments('id');
      tbl.string('asset_id').notNullable();
      tbl.string('user_id').notNullable();
      tbl.string('time_in').notNullable();
      tbl.string('time_out').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('history');
};
