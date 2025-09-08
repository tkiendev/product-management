const cartModel = require("../../models/cart.model");
const productModel = require('../../models/product.model');

module.exports.add = async (req, res) => {
    const cartId = req.params.id;
    const reqProduct = req.body;
    try {
        if (cartId && reqProduct) {
            const cart = await cartModel.findOne({ _id: cartId });
            const checkProduct = cart.product.find((item) => {
                console.log(item.productId === reqProduct.product_id)
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