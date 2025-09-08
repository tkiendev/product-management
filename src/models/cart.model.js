const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    // user_id: String,
    product: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const cartModel = mongoose.model('carts', cartSchema);
module.exports = cartModel;