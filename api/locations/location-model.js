const db = require('../../data/dbConfig');

module.exports = {
    get,
    getById,
    add,
    update,
    remove
}

function get() {
    return db('locations')

}
function getById(id) {
    return db('locations')
        .where({id: id})
        .first();
}


function add(location) {
    return db('locations')
        .insert(location, 'id')
        .then(([id]) => getById(id))
}


function update(id, changes) {
    return db('locations')
        .where({ id })
        .update(changes);
}
function remove(id) {
    return db('locations')
        .where('id', id)
        .del();
}
