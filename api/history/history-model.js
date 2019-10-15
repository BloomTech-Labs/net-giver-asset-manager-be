const db = require('../../data/dbConfig');

module.exports = {
    get,
    getById,
    insert
}

function get() {
    return db('history')
}

function getById(id) {
    return db('history')
        .where({id: id})
        .first();
}

function insert(item) {
    return db('history')
        .insert(item, 'id')
        .then(([id]) => getById(id));
}