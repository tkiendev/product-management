const express = require('express');
const route = express.Router();

const productController = require('../../controllers/admin/product.controller.js');

// upload file
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// validation
const validation = require('../../validation/create.validation.js');

// upload file to cloudinary
const uploadCloudinary = require('../../middlewares/uploadCloudinary.middleware.js')

route.patch('/change-status/:status/:id', productController.changeStatus);
route.delete('/change-delete/:id', productController.changeDelete);
route.patch('/change-multi', productController.changeMulti);

route.get('/create', productController.create);
route.post('/create',
    upload.single('thumbnail'),
    validation.create,
    uploadCloudinary.upload,
    productController.actionCreate
);

route.get('/edit/:id', productController.edit);
route.post('/edit/:id',
    upload.single('thumbnail'),
    validation.create,
    uploadCloudinary.upload,
    productController.actionEdit
);

route.get('/detail/:id', productController.detail);

route.get('/', productController.index);

module.exports = route;