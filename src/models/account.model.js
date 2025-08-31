const mongoose = require('mongoose');

const randomString = require('../helpers/randomString.js');

const accountSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    description: String,
    status: String,
    thumbnail: String,
    permissions_id: String,
    token: {
        type: String,
        default: randomString(30)
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const accountModel = mongoose.model('accounts', accountSchema);
module.exports = accountModel;