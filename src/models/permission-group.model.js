const mongoose = require('mongoose');

const permissionGroupSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const permissionGroupModel = mongoose.model('permission-groups', permissionGroupSchema);
module.exports = permissionGroupModel;