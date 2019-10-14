const express = require('express')
const server = express()

const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('../api/auth/auth-router.js');


server.use(express.json())
server.use(cors())
server.use(helmet()) 

server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.status(200).send("We are live!")
})


module.exports = server