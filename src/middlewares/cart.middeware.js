const cartModel = require('../models/cart.model.js');
const productModel = require('../models/product.model.js');

const formattPrice = require('../helpers/formattPrice.js');


function dataSetCart(timeSet = 0) {
    const day = 1000 * 60 * 60 * 24 * timeSet;
    const time = Date.now() + day;
    return time;
}

module.exports = async (req, res, next) => {
    let cart = null;
    const cookieCart = req.cookies.cart;
    if (cookieCart && cookieCart.length === 24) {

        cart = await cartModel.findOne({ _id: cookieCart });
        if (!cart) {
            res.clearCookie('cart');
            const newCart = new cartModel();
            cart = await newCart.save();
            if (cart) {
                res.cookie('cart', cart.id, { expires: new Date(dataSetCart(2)), httpOnly: true });
            }
        }
    } else {
        res.clearCookie('cart');
        const newCart = new cartModel();
        cart = await newCart.save();
        if (cart) {
            res.cookie('cart', cart.id, { expires: new Date(dataSetCart(2)), httpOnly: true });
        }
    }

    if (cart) {
        const cartHeader = {
            id: cart.id,
            products: []
        };

        const cartProduct = [...cart.product];
        const totalProduct = cartProduct.reduce((total, item) => {
            return total + parseInt(item.quantity);
        }, 0);
        cartHeader.totalProduct = totalProduct;

        let totalAmount = 0;
        for (item of cartProduct) {
            const product = await productModel.findOne({ _id: item.productId }).select('title price discountPercentage thumbnail slug');
            if (product) {
                totalAmount += (product.price - (product.price * product.discountPercentage / 100)) * item.quantity;
                cartHeader.products.push({
                    id: product.id,
                    newPrice: formattPrice((product.price - (product.price * product.discountPercentage / 100))),
                    total: formattPrice(((product.price - (product.price * product.discountPercentage / 100)) * item.quantity)),
                    quantity: item.quantity
                    , ...product._doc
                });
            }
        }

        cartHeader.totalAmount = formattPrice(totalAmount);

        res.locals.cart = cartHeader;

        next();
    }
}