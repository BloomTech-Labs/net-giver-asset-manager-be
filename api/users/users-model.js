const db = require("../../data/dbConfig.js");

module.exports = {
  getById,
  getByEmail,
  insert,
  insertImage,
  get,
  getImages,
  getImageById,
  updateUser
};

function get() {
  return db("users");
}

function getImages() {
  return db("user_images");
}

function getById(id) {
  return db("users")
    .where({ id: id })
    .first();
}

function getByEmail(email) {
  return db("users")
    .where({ email: email })
    .first();
}

function getImageById(id) {
  return db("user_images")
    .where({ user_id: id })
    .first();
}

function insert(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => getById(id));
}

function insertImage(image) {
  return db("user_images")
    .insert(image)
    .then(() => image);
}

function updateUser(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}
