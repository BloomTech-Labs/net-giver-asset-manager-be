
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('locations').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        { id: 1, name: 'Disney World' },
        { id: 2, name: 'Universal Studios' },
      ]);
    });
};
