const express = require('express');
const route = express.Router();

const accountController = require('../../controllers/admin/account.controller.js')

// upload file
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// upload file to cloudinary
const uploadCloudinary = require('../../middlewares/uploadCloudinary.middleware.js');

// check validation
const checkValidation = require('../../validation/check-email.validation.js');

route.get('/', accountController.index);

route.get('/create', accountController.create);
route.post('/create', upload.single('thumbnail'), checkValidation.checkEmail, uploadCloudinary.upload, accountController.actionCreate);

route.get('/detail/:id', accountController.detail);

module.exports = route;