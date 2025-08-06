const express = require('express');
const route = express.Router();

const productController = require('../../controllers/admin/product.controller.js');

route.get('/', productController.index);

module.exports = route;