const roleModel = require('../../models/role.model.js')
const accountModel = require('../../models/account.model.js');

const system = require('../../config/systems.js');

const bcrypt = require('bcryptjs');

// [GET] /admin/account
module.exports.index = async (req, res) => {
    try {
        const acccounts = await accountModel.find({ deleted: false }).select('-password -token -token -deleted');
        for (item of acccounts) {
            if (item.permissions_id == '') {
                item.role = '';
            } else {
                const role = await roleModel.findOne({ _id: item.permissions_id });
                item.role = item.role = role.title;
            }
            delete item.permissions_id;
        };

        res.render('admin/pages/account/index.pug', {
            titlePage: 'Quản lý tài khoản',
            acccounts: acccounts,
        });
    } catch (error) {
        req.flash('error', 'Lỗi không thể tải trang');
        res.redirect(`${system.prefixAdmin}/dashboard`);
    }
}

// [GET] /admin/account/create
module.exports.create = async (req, res) => {
    const roles = await roleModel.find({ deleted: false, status: 'active' });
    res.render('admin/pages/account/create.pug', {
        titlePage: 'Quản lý tài khoản',
        roles: roles
    });
}

// [POST] /admin/account/create
module.exports.actionCreate = async (req, res) => {
    try {
        const account = new accountModel(req.body);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(account.password, salt);

        account.password = hash;

        await account.save();
        req.flash('success', 'Tạo tài khoản thành công');
        res.redirect(`${system.prefixAdmin}/account`);
    } catch (error) {
        req.flash('error', 'Lỗi không thể tạo tài khoản');
        res.redirect(`${system.prefixAdmin}/account/create`);
    }
}

// [GET] /admin/account/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const accountUser = await accountModel.findOne({ _id: req.params.id });
        const roles = await roleModel.find({});

        res.render('admin/pages/account/edit', {
            titlePage: accountUser.fullname,
            accountUser: accountUser,
            roles: roles
        });
    } catch (error) {

    }
}

// [PATCH] /admin/account/edit/:id
module.exports.actionEdit = async (req, res) => {
    try {
        if (req.params.id) {
            await accountModel.updateOne({ _id: req.params.id }, req.body);
            req.flash('success', 'Lưu thành công');
            const previousPage = req.get('Referer') || '/';
            res.redirect(previousPage);
        } else {
            req.flash('error', 'Bị lỗi vui lòng thử lại');
            const previousPage = req.get('Referer') || '/';
            res.redirect(previousPage);
        }

    } catch (error) {
        req.flash('error', 'Thực hiện không thành công vui lòng thao tác lại');
        const previousPage = `${system.prefixAdmin}/account/create`;
        res.redirect(previousPage);
    }
}

// [GET] /admin/account/detail/:id
module.exports.detail = async (req, res) => {
    try {

    } catch (error) {

    }
}

// [DELETE] /admin/account/delete/:id
module.exports.delete = async (req, res) => {
    try {

    } catch (error) {

    }
}

// [GET] /admin/permissions-group/permissions
module.exports.permissions = async (req, res) => {
    try {

    } catch (error) {

    }
}

// [PATCH] /admin/permissions-group/action-permissions
module.exports.actionPermissions = async (req, res) => {
    try {

    } catch (error) {

    }
}