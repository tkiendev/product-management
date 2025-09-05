const express = require('express');
const route = express.Router();

const controller = require('../../controllers/user/home.controller')
route.get('/', controller.index);
route.get('/about', controller.about);

module.exports = route;