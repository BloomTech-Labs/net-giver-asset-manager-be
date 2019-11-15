exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('asset_images').del()
      .then(function () {
        // Inserts seed entries
        return knex('asset_images').insert([
          {
            asset_img_id: 1,
            location: 'cheeto.com',
          },
          {
            asset_img_id: 2,
            location: 'dorito.com',
          },
          {
            asset_img_id: 3,
            location: 'pringle.com',
          },
        ]);
      });
  };