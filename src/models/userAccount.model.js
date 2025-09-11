const mongoose = require('mongoose');

const randomString = require('../helpers/randomString.js');

const userAccoutSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    address: String,
    description: String,
    status: {
        type: String,
        default: 'active'
    },
    thumbnail: String,
    cart_id: String,
    token: {
        type: String,
        default: randomString(30)
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const userAccountModel = mongoose.model('userAccounts', userAccoutSchema);
module.exports = userAccountModel;