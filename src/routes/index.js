const routes = require('express').Router();

const customer = require('./customer');
const pizza = require('./pizza');

routes.use('/customer', customer);
routes.use('/pizza', pizza);

module.exports = routes;
