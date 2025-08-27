const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    title: String,
    description: String,
    permission: {
        type: Array,
        default: []
    },
    status: String,
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const roleModel = mongoose.model('roles', rolesSchema);
module.exports = roleModel;