const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const assetsModel = require('./assets-model');
const authenticate = require('../auth/auth-middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(authenticate);

server.get('/', authenticate, (req, res) => {
    assetsModel.getAssets()
        .then(assetsModel => {
            res.json(assetsModel);
        })
        .catch(err => res.send(err));
});

server.get('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    assetsModel.getAsset(id)
        .then(assetModel => {
            res.json(assetModel);
        })
        .catch(err => res.send(err));
});

server.post('/', authenticate, (req, res) => {
    const assetsData = req.body;

    const locationId = req.body.location_id
    const userId = req.body.user_id

    assetsData.location_id = locationId;
    assetsData.user_id = userId;
    assetsModel.postasset(assetsData)
        .then((assetsModel) => {
            res.status(200).json(assetsModel)
        }).catch((err) => {
            res.status(500).json({ message: 'Error adding asset' })
        });
});


server.put('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    assetsModel.updateAsset(id, changes)
        .then((assetsModel) => {
            res.status(200).json({ message: `asset ${id} updated!` })
        }).catch((err) => {
            res.status(500).json({ message: 'Error Updating asset' })
        });
});

server.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    assetsModel.removeAsset(id)
        .then(assetsModel => {
            res.status(204).json({ message: `asset ${id} Deleted!` })
        }).catch((err) => {
            res.status(500).json({ message: 'Error Deleting asset' })
        });
});

module.exports = server;


