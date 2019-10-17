
exports.up = function (knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('id');
      tbl.string('email').notNullable().unique();
      tbl.string('password').notNullable();

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
      tbl.string('photo');
      tbl.integer('barcode').notNullable();
      tbl.boolean('check_in_status').notNullable();
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
    .createTable('history', tbl => {
      tbl.increments('id');
      tbl.timestamp('time_in').defaultTo(knex.fn.now()).notNullable();
      tbl.timestamp('time_out').defaultTo(knex.fn.now()).notNullable();
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl
        .integer('asset_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('assets')
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
