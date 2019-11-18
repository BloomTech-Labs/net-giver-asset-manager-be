exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("history")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("history").insert([
        {
          id: 1,
          asset_id: 1,
          user_id: 1
        }
      ]);
    });
};
