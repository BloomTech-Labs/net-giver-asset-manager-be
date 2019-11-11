const express = require('express');
const Users = require('./users-model');
const router = express.Router();

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Users.getImageById(id)
        .then(image => {
            console.log(image);
            res.status(200).json(image);
        })
        .catch(err => {
            res.status(500).json({error: 'Could not retrieve image'});
        });
});

router.post('/', (req, res) => {
    const { location, user_id } = req.body;
    if(location, user_id) {
        Users.insertImage(req.body)
            .then(image => {
                console.log(image);
                res.status(201).json(image);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'Could not post image'});
            });
    } else {
        res.status(400).json({message: 'Must include location and userId'});
    }
});

module.exports = router;