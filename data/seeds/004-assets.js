
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('assets').del()
    .then(function () {
      // Inserts seed entries
      return knex('assets').insert([
        {
          asset_img_id: 1,
          user_id: 1,
          name: 'cheeto',
          barcode: 111,
        },
        {
          asset_img_id: 2,
          user_id: 2,
          name: 'dorito',
          barcode: 222,
        },
        {
          asset_img_id: 3,
          user_id: 3,
          name: 'pringle',
          barcode: 333,
        },
      ]);
    });
};