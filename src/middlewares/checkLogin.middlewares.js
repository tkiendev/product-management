const system = require('../config/systems');

const accountModel = require('../models/account.model');
const roleModel = require('../models/role.model');

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        const user = await accountModel.findOne({
            token: token,
            deleted: false,
            status: 'active'
        }, {
            password: 0,
            deleted: 0,
            token: 0
        });
        if (user) {
            res.locals.user = user;
            const role = await roleModel.findOne({
                _id: user.permissions_id,
                deleted: false
            }).select('-description -status -deleted -createdAt -updatedAt');
            if (role) {
                res.locals.user.role = role
            }
            next();
        } else {
            res.clearCookie('token', { path: '/admin' });
            const previousPage = `${system.prefixAdmin}/auth/login`;
            res.redirect(previousPage);
        }
    }
    else {
        const previousPage = `${system.prefixAdmin}/auth/login`;
        res.redirect(previousPage);
    }

}