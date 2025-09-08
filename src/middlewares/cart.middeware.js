const mongoose = require('mongoose');

const cartModel = require('../models/cart.model.js');

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
        res.locals.cart = cart
        next();
    }
}