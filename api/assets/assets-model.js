const db = require('../../data/dbConfig');

module.exports = {
    getAssets,
    getAsset,
    postAsset,
    updateAsset,
    removeAsset,
    insertImage,
    getAssetImageById
}

function getAssets() {
    return db('assets').select('id', 'name', 'category', 'description', 'photo', 'barcode', 'check_in_status', 'location_id', 'user_id')
}
function getAsset(id) {
    return db('assets')
        .where('id', id)
        .select('id', 'name', 'category', 'description', 'photo', 'barcode', 'check_in_status', 'location_id', 'user_id');
}


function postAsset(asset) {
    return db('assets').insert(asset);
}


function updateAsset(id, changes) {
    return db('assets')
        .where({ id })
        .update(changes);
}
function removeAsset(id) {
    return db('assets')
        .where('id', id)
        .del();
}
function insertImage(image) {
    return db('asset_images')
        .insert(image)
        .then(() => image);
}
function getAssetImageById(id) {
    return db('asset_images')
        .where({asset_id: id})
        .first();
}