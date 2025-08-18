const slugify = require('slugify');
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
    slug: {
        type: String,
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Tạo slug tự động trước khi lưu
product.pre('save', function (next) {
    if (this.isModified('title')) {
        const title = this.title + '-' + Date.now();
        this.slug = slugify(title, {
            replacement: '-',
            locale: 'vi',
            lower: true,
            strict: true
        });
    }
    next();
});

const products = mongoose.model('products', product);
module.exports = products;