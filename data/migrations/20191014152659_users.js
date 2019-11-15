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
    .createTable('asset_images', tbl => {
      tbl.string('location').notNullable();
      tbl.integer('asset_img_id').unique().notNullable();
    })
    .createTable("assets", tbl => {
      tbl
        .integer("asset_img_id")
        .unsigned()
        .notNullable()
        .references("asset_img_id")
        .inTable("asset_images")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.string("name").notNullable();
      tbl.string("category");
      tbl.string("description");
      tbl.string("barcode").notNullable();
      tbl.boolean("check_in_status").defaultTo(true);
      // Foreign Key
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
        .references("asset_img_id")
        .inTable("asset_images")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("history")
    .dropTableIfExists("assets")
    .dropTableIfExists("asset_images")
    .dropTableIfExists("user_images")
    .dropTableIfExists("locations")
    .dropTableIfExists("users");
};
