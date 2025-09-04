const slugify = require('slugify');
const mongoose = require('mongoose');

const product = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category_id: String,
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
    },
    deletedBy: {
        id_user: String,
        deleteAt: Date
    },
    updateBy: {
        type: Array,
        default: []
    },
    createBy: {
        id_user: String,
        craeteAt: {
            type: Date,
            default: Date
        }
    }
});

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