exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_images').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_images').insert([
        {
          id: 1,
          user_id: 1,
          location: 'cheeasasdasdato.com',
        }
      ]);
    });
};