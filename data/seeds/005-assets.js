
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('assets').del()
    .then(function () {
      // Inserts seed entries
      return knex('assets').insert([
        {
          id: 1,
          name: 'chezdsSSasdasdeto',
          barcode: 6416,
          check_in_status: 0,
          pic_img_id: 1,
          user_id: 1,
        }
      ]);
    });
};