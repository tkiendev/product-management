const express = require('express');
const route = express.Router();

const userControler = require('../../controllers/user/user.controller');

route.get('/login', userControler.login);
route.post('/login', userControler.activeLogin);

route.get('/logout', userControler.logout);

route.get('/register', userControler.register);
route.post('/register', userControler.activeRegister);


module.exports = route;