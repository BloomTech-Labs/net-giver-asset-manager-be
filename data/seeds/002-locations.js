exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("locations")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("locations").insert([
        {
          id: 1,
          name: "Storage Facility",
          description: "Located inside campus B",
        },
        {
          id: 2,
          name: "Warehouse Campus A",
          description: "Located in Alabama",
        }
      ]);
    });
};
