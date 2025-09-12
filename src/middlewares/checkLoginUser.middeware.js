const userAccountModel = require('../models/userAccount.model.js');

module.exports = async (req, res, next) => {
    if (req.cookies.user_token) {
        const user = await userAccountModel.findOne({ token: req.cookies.user_token }).select('-password');
        if (user) {
            if (user.cart_id) {
                res.clearCookie('cart');
                res.cookie('cart', user.cart_id);
            }

            res.locals.user = user;
        }
    }
    next();
}