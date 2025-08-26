const express = require('express');
const route = express.Router();

const permissionsGroupController = require('../../controllers/admin/permissions-group.controller.js');

route.get('/', permissionsGroupController.index);

route.get('/create', permissionsGroupController.create);
route.post('/create', permissionsGroupController.actionCreate);

module.exports = route;