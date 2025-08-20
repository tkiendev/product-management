const productModel = require('../../models/product.model');
const formattPrice = require('../../helpers/formattPrice');
// [GET] /products
module.exports.index = async (req, res) => {

    try {
        const products = await productModel.find({
            status: 'active',
            deleted: false
        }).sort({ position: 1 });
        const newProducts = products.map((product) => {
            const objProduct = product;
            objProduct.stringNewPrice = formattPrice(product.price - (product.price * product.discountPercentage / 100));
            objProduct.stringPrice = formattPrice(product.price);
            return objProduct;
        });

        res.render('user/pages/product/index', {
            titlePagae: 'Trang Sản Phẩm',
            titleHead: 'Danh sách sản phẩm',
            products: newProducts
        });
    }
    catch (error) {
        res.redirect(`/`);
    }
};

// [GET] /products/detail
module.exports.detail = async (req, res) => {
    try {
        if (req.params.slug) {
            const product = await productModel.findOne({ slug: req.params.slug });
            product.stringNewPrice = formattPrice(product.price - (product.price * product.discountPercentage / 100));
            product.stringPrice = formattPrice(product.price);

            res.render('user/pages/product/detail', {
                titlePagae: product.title,
                titleHead: product.title,
                product: product
            });
        }
    }
    catch (error) {
        res.redirect(`/products`);
    }
};