const express = require('express');
const route = express.Router();

const controller = require('../../controllers/user/product.controller')

route.get('/detail/:slug', controller.detail);
route.get('/', controller.index);


module.exports = route;