const express = require('express');
const Users = require('./users-model');
const router = express.Router();

// get all user images
router.get('/', (req, res) => {
    Users.getImages()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Could not retrieve users'});
        });
});

// get image by user id
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

// post user image
router.post('/', (req, res) => {
    const { location, user_id } = req.body;
    if(location && user_id) {
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