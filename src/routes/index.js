const routes = require('express').Router();

const customer = require('./customer');
const pizza = require('./pizza');
const cart = require('./cart');

routes.use('/customer', customer);
routes.use('/pizza', pizza);
routes.use('/cart', cart);

module.exports = routes;
