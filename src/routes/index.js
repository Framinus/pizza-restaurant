const routes = require('express').Router()

const customer = require('./customer')

routes.use('/customer', customer)

module.exports = routes;
