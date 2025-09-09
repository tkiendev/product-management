const cartModel = require('../../models/cart.model');
const checkoutModel = require('../../models/checkout.model');
const productModel = require('../../models/product.model');

// [GET] /checkout
module.exports.index = (req, res) => {
    res.render('user/pages/checkout/index.pug');
}

// [POST] /checkout/:cartId
module.exports.pay = async (req, res) => {
    if (req.params.cartId) {
        let checkout = {}
        const cart = await cartModel.findOne({ _id: req.params.cartId });
        if (cart) {
            const product = cart.product;
            if (product.length > 0) {
                const checkoutProduct = [];
                let totalAmount = 0;
                let totalQuantity = 0;
                for (item of product) {
                    let newProduct = (await productModel.findOne({ _id: item.productId }).select('title thumbnail price discountPercentage'))._doc;
                    if (newProduct) {
                        newProduct.newPrice = parseInt(newProduct.price - (newProduct.price * newProduct.discountPercentage / 100));
                        newProduct.totalQuantityProduct = item.quantity;
                        newProduct.totalAmountProduct = (newProduct.newPrice * newProduct.totalQuantityProduct);

                        totalQuantity += parseInt(item.quantity);
                        totalAmount += newProduct.totalAmountProduct;

                        checkoutProduct.push(newProduct);
                    }

                }
                checkout = {
                    cartId: req.params.cartId,
                    ...req.body,
                    product: checkoutProduct,
                    totalAmount: totalAmount,
                    totalQuantity: totalQuantity
                }
                try {
                    const newCheckout = await checkoutModel(checkout);
                    newCheckout.save();
                    if (newCheckout) {
                        await cartModel.updateOne({ _id: req.params.cartId }, { product: [] });
                    }
                } catch (error) {
                    const previousUrl = req.get('Referer') || '/';
                    res.redirect(previousUrl);
                    return;
                }
            } else {
                const previousUrl = req.get('Referer') || '/';
                res.redirect(previousUrl);
                return;
            }

        }
    }
    const previousUrl = req.get('Referer') || '/';
    res.redirect(previousUrl);
}