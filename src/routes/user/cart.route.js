const express = require('express');
const route = express.Router();

const cartController = require('../../controllers/user/cart.controller');

route.post('/add/:id', cartController.add);

module.exports = route;