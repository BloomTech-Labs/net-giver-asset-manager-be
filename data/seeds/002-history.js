exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("history")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("history").insert([
        {
          id: 1,
          asset_id: 2,
          user_id: 3
        },
        {
          id: 2,
          asset_id: 2,
          user_id: 2
        },
        {
          id: 3,
          asset_id: 3,
          user_id: 3
        }
      ]);
    });
};
