
exports.up = function (knex) {
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
    .createTable('locations', tbl => {
      tbl.increments('id');
      tbl.string('name').notNullable().unique();
    })
    .createTable('assets', tbl => {
      tbl.increments('id');
      tbl.string('name').notNullable();
      tbl.string('category');
      tbl.string('description');
      tbl.boolean('check_in').notNullable();
      // Foreign Key
      tbl
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

    })

};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('assets')
    .dropTableIfExists('locations')
    .dropTableIfExists('history')
    .dropTableIfExists('users');

};
