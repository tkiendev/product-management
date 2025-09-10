const express = require('express');
const route = express.Router();

const checkoutController = require('../../controllers/user/checkout.controller');

route.get('/', checkoutController.index);
route.post('/:cartId', checkoutController.pay);
route.get('/order', checkoutController.order);

module.exports = route;