
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('assets').del()
    .then(function () {
      // Inserts seed entries
      return knex('assets').insert([
        { id: 1, name: 'Laptop', category: 'Electronic', description: "A Macbook laptop", barcode: 555555, check_in_status: false, location_id: 1, user_id: 1 },
        { id: 2, name: 'Laptop', category: 'Electronic', description: "A Macbook laptop", barcode: 655555, check_in_status: false, location_id: 1, user_id: 2 }
      ]);
    });
};