exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, email: "a@a.com", password: "123", username: "bobby" },

      ]);
    });
};

// { id: 6, email: 'test@test.com', password: '$2a$08$R8vjqjlKcRsNuYacfoDcZ.931fdU/3UYG36xX2n2V6iSWE1KePn.G' } // Password: 123456
