const mongoose = require('mongoose');

const product = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean
});

const products = mongoose.model('products', product);
module.exports = products;