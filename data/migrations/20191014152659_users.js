exports.up = function (knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments("id");
      tbl.string('username').unique().notNullable();
      tbl.string("email").notNullable().unique();
      tbl.string("password").notNullable();
    })
    .createTable("locations", tbl => {
      tbl.increments("id");
      tbl.string("name").notNullable().unique();
      tbl.string("description");
    })
    .createTable("assets", tbl => {
      tbl.increments("id");
      tbl.string("name").notNullable();
      tbl.string("category");
      tbl.string("description");
      tbl.string("photo");
      tbl.string("barcode").notNullable();
      tbl.boolean("check_in_status").notNullable();
      // Foreign Key
      tbl
        .integer("location_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("locations")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable('user_images', tbl => {
      tbl.string('location').notNullable();
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable('asset_images', tbl => {
      tbl.string('location').notNullable();
      tbl
        .integer('asset_id')
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("assets")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("history", tbl => {
      tbl.increments("id");
      tbl.timestamp("time_in").defaultTo(knex.fn.now());
      tbl.timestamp("time_out").defaultTo(knex.fn.now());
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("asset_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("assets")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("history")
    .dropTableIfExists("asset_images")
    .dropTableIfExists("user_images")
    .dropTableIfExists("assets")
    .dropTableIfExists("locations")
    .dropTableIfExists("users");
};
