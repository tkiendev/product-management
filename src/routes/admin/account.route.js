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
const checkValidation = require('../../validation/check-account.validation.js');

route.get('/', accountController.index);
route.get('/profile', accountController.profile);

route.get('/create', accountController.create);
route.post('/create',
    upload.single('thumbnail'),
    checkValidation.checkEmail,
    uploadCloudinary.upload,
    accountController.actionCreate);

route.get('/edit/:id', accountController.edit);
route.patch('/edit/:id',
    upload.single('thumbnail'),
    checkValidation.checkPageEditEmail,
    checkValidation.checkPageEditPassword,
    uploadCloudinary.upload,
    accountController.actionEdit
);


module.exports = route;