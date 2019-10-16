const express = require('express')
const server = express()

const cors = require('cors')
const helmet = require('helmet')

const authenticate = require('../api/auth/auth-middleware')

const authRouter = require('../api/auth/auth-router.js');
const assetsRouter = require('../api/assets/assets-router.js');
const historyRouter = require('../api/history/history-router.js');
const locationRouter = require('../api/locations/location-router');


server.use(express.json())
server.use(cors())
server.use(helmet())

server.use('/api/auth', authRouter);
server.use('/api/assets', authenticate, assetsRouter);
server.use('/api/history', authenticate, historyRouter);
server.use('/api/location', locationRouter);


server.get('/', (req, res) => {
    res.status(200).send("We are live!")
})


module.exports = server