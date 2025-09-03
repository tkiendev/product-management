const express = require('express');
const route = express.Router();

const authController = require('../../controllers/admin/auth.controller.js');

route.get('/login', authController.login);
route.post('/login', authController.actionLogin);

module.exports = route;