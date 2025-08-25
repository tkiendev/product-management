const express = require('express');
const route = express.Router();

const productCategoryController = require('../../controllers/admin/product-category.controller.js')

// upload file
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// upload file to cloudinary
const uploadCloudinary = require('../../middlewares/uploadCloudinary.middleware.js');

route.get('/', productCategoryController.index);
route.get('/create', productCategoryController.create);
route.post('/create', upload.single('thumbnail'), uploadCloudinary.upload, productCategoryController.actionCreate);

module.exports = route;