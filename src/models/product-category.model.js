const slugify = require('slugify');
const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    title: String,
    parent_id: String,
    description: String,
    position: Number,
    status: String,
    thumbnail: String,
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
productCategorySchema.pre('save', function (next) {
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

const productCategory = mongoose.model('product-categorys', productCategorySchema);
module.exports = productCategory;