const cartModel = require("../../models/cart.model");
const productModel = require('../../models/product.model');


// [POST] cart/add/:id
module.exports.add = async (req, res) => {
    const cartId = req.params.id;
    const reqProduct = req.body;
    try {
        if (cartId && reqProduct) {
            const cart = await cartModel.findOne({ _id: cartId });
            const checkProduct = cart.product.find((item) => {
                return item.productId === reqProduct.product_id;
            });
            if (checkProduct) {
                const objProduct = {
                    ProductId: reqProduct.product_id,
                    quantity: (parseInt(reqProduct.quantity) + parseInt(checkProduct.quantity))
                }
                await cartModel.updateOne({ _id: cartId, 'product.productId': reqProduct.product_id }, { $set: { 'product.$.quantity': objProduct.quantity } })
            } else {
                const objProduct = {
                    productId: reqProduct.product_id,
                    quantity: reqProduct.quantity
                }
                await cartModel.updateOne({ _id: cartId }, { $push: { product: objProduct } })
            }

            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        }
    } catch (error) {
        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
    }
}

// [GET] /cart
module.exports.index = (req, res) => {
    res.render('user/pages/cart/index.pug');
}

// [GET] /cart/:cardId/:id
module.exports.delete = async (req, res) => {

    await cartModel.updateOne({ _id: req.params.cartId }, { $pull: { product: { productId: req.params.id } } });

    const previousUrl = req.get('Referer') || '/';
    res.redirect(previousUrl);
}