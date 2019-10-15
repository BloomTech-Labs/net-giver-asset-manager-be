
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('history').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('history').insert([
        {
          id: '1',
          asset_id: '1',
          user_id: '1',
          time_in: '12:00',
          time_out: '12:01'
        },
        {
          id: '2',
          asset_id: '2',
          user_id: '2',
          time_in: '4:00',
          time_out: '4:01'
        },
        {
          id: '3',
          asset_id: '3',
          user_id: '3',
          time_in: '6:00',
          time_out: '6:01'
        }
      ]);
    });
};
