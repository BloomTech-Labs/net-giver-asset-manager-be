// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');

const express = require('express');

const Location = require('./location-model');
const His = require('../locations/location-model');

const router = express.Router();

// const server = express();

// server.use(helmet());
// server.use(express.json());
// server.use(cors());

router.get('/loc', (req, res) => {
    res.status(200).send("LOCATION AREA")
});

// router.get('/', (req, res) => {
//     Location.get()
//         .then(location => res.status(200).send("Hello world"))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: 'Could not retrieve locations' });
//         });
// })

router.get('/', (req, res) => {
    His.get()
        .then(items => res.status(200).json(items))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not retrieve locations' });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Location.getById(id)
        .then(locModel => {
            res.json(locModel);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not retrieve location' });
        });
});

router.post('/', (req, res) => {
    const locData = req.body;
    console.log('data info ', locData);
    Location.add(locData)
        .then(item => {
            res.status(201).json(item);
        })
        .catch(err => {
            res.status(500).json({ message: 'error getting the list of hubs' });
        });
});


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Location.update(id, changes)
        .then((Location) => {
            res.status(200).json({ message: `location ${id} updated!` })
        }).catch((err) => {
            res.status(500).json({ message: 'Error Updating location' })
        });
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Location.remove(id)
        .then(Location => {
            res.status(200).json({ message: `location ${id} is permanently deleted!` })
        }).catch((err) => {
            res.status(500).json({ message: 'Error Deleting location' })
        });
});


module.exports = router;



