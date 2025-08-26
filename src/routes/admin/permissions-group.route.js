const express = require('express');
const route = express.Router();

const permissionsGroupController = require('../../controllers/admin/permissions-group.controller.js');

route.get('/', permissionsGroupController.index);

module.exports = route;