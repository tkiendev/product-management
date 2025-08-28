const express = require('express');
const route = express.Router();

const roleController = require('../../controllers/admin/role.controller.js');

route.get('/', roleController.index);

route.patch('/action-permissions', roleController.actionPermissions);
route.get('/permissions', roleController.permissions);

route.get('/create', roleController.create);
route.post('/create', roleController.actionCreate);

route.get('/edit/:id', roleController.edit);
route.patch('/edit/:id', roleController.actionEdit);

route.get('/detail/:id', roleController.detail);

route.delete('/change-delete/:id', roleController.delete);

module.exports = route;