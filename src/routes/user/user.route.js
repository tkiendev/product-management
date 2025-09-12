const express = require('express');
const route = express.Router();

const userControler = require('../../controllers/user/user.controller');

route.get('/login', userControler.login);
route.post('/login', userControler.activeLogin);

route.get('/logout', userControler.logout);

route.get('/register', userControler.register);
route.post('/register', userControler.activeRegister);

route.get('/forgot-password', userControler.forgotPassword);
route.post('/forgot-password/otp', userControler.forgotPasswordOtp);

route.post('/change-password', userControler.changePassword);
route.post('/change-password/active', userControler.activeChangePassword);



module.exports = route;