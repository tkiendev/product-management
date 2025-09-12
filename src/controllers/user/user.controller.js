const bcrypt = require("bcryptjs");

const userAccountModel = require('../../models/userAccount.model.js');
const otpModel = require('../../models/otp.model.js');

const sendMailHepler = require('../../helpers/sendEmail.js');

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

// [GET] /user/forgot-password
module.exports.forgotPassword = (req, res) => {
    res.render('user/pages/user/forgotPassword.pug');
}

// [POST] /user/forgot-password/otp
module.exports.forgotPasswordOtp = async (req, res) => {
    const checkEmail = await otpModel.findOne({ email: req.body.email });
    if (!checkEmail) {
        const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
        const newOtp = new otpModel({
            ...req.body,
            otp: otp
        });
        newOtp.save();

        // send email
        const subject = 'Mã xác thực của bạn';
        const text = `otp của bạn là; ${otp} `;
        const checksend = await sendMailHepler(process.env.FORM_EMAIL, process.env.PASS, req.body.email, subject, text);
        if (checksend) {
            res.render('user/pages/user/forgotPasswordOtp.pug', {
                email: req.body.email
            });
        }
    }
}

// [POST] /user/change-password
module.exports.changePassword = async (req, res) => {
    const checkOtp = await otpModel.findOne({ email: req.body.email, otp: req.body.otp });
    if (checkOtp) {
        res.render('user/pages/user/changePassword.pug', {
            email: req.body.email
        });
    }
}

// [POST] /user/change-password/active
module.exports.activeChangePassword = async (req, res) => {

    if (req.body.password === req.body.passwordCheck) {
        const password = await bcrypt.hash(req.body.password, 10);
        await userAccountModel.updateOne({ email: req.body.email }, { password: password });
        res.redirect('/user/login');
    } else {
        const backURL = req.get('Referer') || '/';
        res.redirect(backURL);
    }
}