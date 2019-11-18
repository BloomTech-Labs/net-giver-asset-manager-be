exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('asset_images').del()
    .then(function () {
      // Inserts seed entries
      return knex('asset_images').insert([

        {
          id: 1,
          asset_img_id: 951472,
          location: 'asdasdasd.com',
        },
        {
          id: 2,
          asset_img_id: 951472,
          location: 'asdasdasd.com',
        }
      ]);
    });
};