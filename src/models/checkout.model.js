const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'waiting'
    },
    cartId: String,
    fullname: String,
    phone: Number,
    email: String,
    address: String,
    note: String,
    product: {
        type: Array,
        default: []
    },
    totalAmount: Number,
    totalQuantity: Number,
}, { timestamps: true });

const checkoutModel = mongoose.model('checkout', checkoutSchema);
module.exports = checkoutModel;