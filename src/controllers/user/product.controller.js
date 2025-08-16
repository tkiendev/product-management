const productModel = require('../../models/product.model');

// [GET] /products
module.exports.index = async (req, res) => {
    const formattPrice = (number) => {
        const string = number.toString();
        const charArray = string.split('');
        let count = 1;
        for (let i = charArray.length - 1; i >= 0; i--) {
            if (count % 3 === 0) {
                charArray.splice(i, 0, '.');
            }
            count++;
        }
        const formatted = charArray.join('');
        return formatted;
    };
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
        console.log(error);
    }
};