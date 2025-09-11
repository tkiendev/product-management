const bcrypt = require("bcryptjs");

const userAccountModel = require('../../models/userAccount.model.js');

// [GET] /user/login
module.exports.login = (req, res) => {
    res.render('user/pages/user/login.pug');
}

// [POST] /user/login
module.exports.activeLogin = async (req, res) => {
    if (req.body) {
        const user = await userAccountModel.findOne({
            email: req.body.email,
            deleted: false,
            status: 'active'
        });
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (checkPassword) {
            res.cookie('user_token', user.token);
            res.redirect('/')
        }
    }
}


// [GET] /user/register
module.exports.register = (req, res) => {
    res.render('user/pages/user/register.pug');
}

// [POST] /user/register
module.exports.activeRegister = async (req, res) => {
    if (req.body) {
        const user = {
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
            cart_id: req.cookies.cart,
        };

        const newUser = new userAccountModel(user);
        newUser.save();
        if (newUser) {
            res.cookie('user_token', newUser.token);
            res.redirect('/');
        }
    }
}

// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie('cart');
    res.clearCookie('user_token');
    res.redirect('/');
}