
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('assets').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('assets').insert([
        { id: 1, name: 'Laptop', category: 'Electronic', description: "A Macbook laptop", check_in: false, location_id: 1, user_id: 1 }
      ]);
    });
};