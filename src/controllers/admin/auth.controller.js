const bcrypt = require("bcryptjs");

const accountModel = require('../../models/account.model.js');

const system = require('../../config/systems.js')

// [GET] admin/auth/login
module.exports.login = (req, res) => {
    res.render('admin/pages/auth/login');
}

// [POTH] admin/auth/login
module.exports.actionLogin = async (req, res) => {
    try {
        if (req.body) {
            const user = await accountModel.findOne({ email: req.body.email });

            const checkPassword = await bcrypt.compare(req.body.password, user.password,); // true
            if (checkPassword) {
                res.cookie('token', user.token, { path: system.prefixAdmin, secure: true });

                req.flash('success', 'Xin chào admin');
                const previousPage = `${system.prefixAdmin}/dashboard`;
                res.redirect(previousPage);
                return;
            }
            else {
                req.flash('error', 'Mật khẩu không hợp lệ');
                const previousPage = `${system.prefixAdmin}/auth/login`;
                res.redirect(previousPage);
                return;
            }
        }
    } catch (error) {
        req.flash('error', 'Lỗi không thể đăng nhập');
        const previousPage = `${system.prefixAdmin}/auth/login`;
        res.redirect(previousPage);
        return;
    }
}

