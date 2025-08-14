const express = require('express');
const route = express.Router();

const productController = require('../../controllers/admin/product.controller.js');

route.patch('/change-status/:status/:id', productController.changeStatus);
route.get('/', productController.index);

module.exports = route;