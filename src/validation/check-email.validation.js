const accountModel = require('../models/account.model');
const system = require('../config/systems');

module.exports.checkEmail = async (req, res, next) => {
    try {
        if (req.body.email && req.body.email != '') {
            const user = await accountModel.findOne({
                email: req.body.email,
                deleted: false
            });
            if (user) {
                req.flash('error', 'Email đã tồn tại');
                res.redirect(`${system.prefixAdmin}/account/create`);
                return;
            }
            else {
                next();
            }
        } else {
            req.flash('error', 'Vui lòng nhập email');
            res.redirect(`${system.prefixAdmin}/account/create`);
            return;
        }
    }
    catch (error) {
        req.flash('error', 'Đã xảy ra lỗi vui lònh thử lại');
        res.redirect(`${system.prefixAdmin}/account/create`);
    }
}