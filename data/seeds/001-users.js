exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: "1", email: "a@a.com", password: "123", username: "bobby" },
        { id: "2", email: "b@a.com", password: "123", username: "bobbys" },
        { id: "3", email: "c@a.com", password: "123", username: "bobbyss" },
        { id: "4", email: "pop@pop", password: "123", username: "bobbysss" },
        { id: "5", email: "bub@bub", password: "123", username: "bobbyssss" }
      ]);
    });
};

// { id: 6, email: 'test@test.com', password: '$2a$08$R8vjqjlKcRsNuYacfoDcZ.931fdU/3UYG36xX2n2V6iSWE1KePn.G' } // Password: 123456
