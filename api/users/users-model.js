const db = require('../../data/dbConfig.js');

module.exports = {
    getById,
    getByEmail,
    insert
}

function getById(id) {
    return db('users')
        .where({id: id})
        .first();
}

function getByEmail(email) {
    return db('users')
        .where({email: email})
        .first();
}

function insert(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => getById(id));
}