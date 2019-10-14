const knex = require('knex')
const secrets = require('../config/secrets')
const environment = process.env.DB_ENV || 'development'

const dbConfig = require('../knexfile.js')[environment]



module.exports = knex(dbConfig)