const knex = require('knex')
const secrets = require('../config/secrets')
const environment = secrets.environment || 'development'

const dbConfig = require('../knexfile.js')[environment]



module.exports = knex(dbConfig)