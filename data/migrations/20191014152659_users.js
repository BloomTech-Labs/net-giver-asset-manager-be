
exports.up = function (knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('id');
      tbl.string('email').notNullable().unique();
      tbl.string('password').notNullable();
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
    .dropTableIfExists('users');
};
