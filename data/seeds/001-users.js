
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: '1', email: 'a@a.com', password: '123'},
        {id: '2', email: 'b@a.com', password: '123'},
        {id: '3', email: 'c@a.com', password: '123'}
      ]);
    });
};
