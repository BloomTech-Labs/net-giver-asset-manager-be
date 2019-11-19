exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("locations")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("locations").insert([
        {
          id: 1,
          name: "Storage Facility",
          location_qrcode: 65416153,
          container: "Office",
          address: "651",
          description: "Located inside campus B",
        }
      ]);
    });
};


// tbl.increments("id");
// tbl.string("name").notNullable().unique();
// tbl.string("location_qrcode").notNullable();
// tbl.string("container");
// tbl.string("address");
// tbl.string("description");