const express = require('express');
const route = express.Router();

const productController = require('../../controllers/admin/product.controller.js');

// upload file
const multer = require('multer');
const storageHepler = require('../../helpers/storage.js');
const upload = multer({ storage: storageHepler.storage });

route.patch('/change-status/:status/:id', productController.changeStatus);
route.delete('/change-delete/:id', productController.changeDelete);
route.patch('/change-multi', productController.changeMulti);
route.get('/create', productController.create);
route.post('/create', upload.single('thumbnail'), productController.actionCreate);
route.get('/edit/:id', productController.edit);
route.post('/edit/:id', upload.single('thumbnail'), productController.actionEdit);


route.get('/', productController.index);

module.exports = route;