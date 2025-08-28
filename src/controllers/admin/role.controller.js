const roleModel = require('../../models/role.model.js')

const system = require('../../config/systems.js');

// [GET] /admin/permission-group
module.exports.index = async (req, res) => {
    const permissionsGroup = await roleModel.find({ deleted: false });
    res.render('admin/pages/permission-group/index.pug', {
        titlePage: 'Nhóm phần quyền',
        permissionsGroup: permissionsGroup
    });
}

// [GET] /admin/permission-group/create
module.exports.create = (req, res) => {
    res.render('admin/pages/permission-group/create.pug', {
        titlePage: 'Tạo nhóm phần quyền',
    });
}

// [POST] /admin/permission-group/create
module.exports.actionCreate = async (req, res) => {
    try {
        if (req.body) {
            const permissionGroup = new roleModel(req.body);
            await permissionGroup.save();

            req.flash('success', 'Tạo mới thành công');
            const previousUrl = `${system.prefixAdmin}/permissions-group`;
            res.redirect(previousUrl);
        } else {
            req.flash('error', 'Tạo mới thất bại')
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        }
    } catch (error) {
        {
            req.flash('error', 'Không thế tải trang')
            const previousUrl = `${system.prefixAdmin}/permissions-group`;
            res.redirect(previousUrl);
        }
    }
}

// [GET] /admin/permission-group/edit/:id
module.exports.edit = async (req, res) => {
    try {
        if (req.params.id) {
            const permissionsGroup = await roleModel.findById(req.params.id)
            res.render('admin/pages/permission-group/edit.pug', {
                titlePage: 'Chỉnh sửa nhóm phần quyền',
                permissionsGroup: permissionsGroup
            });
        } else {
            req.flash('error', 'Tải nhóm lên thất bại')
            const previousUrl = `${system.prefixAdmin}/permissions-group`;
            res.redirect(previousUrl);
        }
    } catch (error) {
        req.flash('error', 'Tải nhóm lên thất bại')
        const previousUrl = `${system.prefixAdmin}/permissions-group`;
        res.redirect(previousUrl);
    }
}

// [PATCH] /admin/permission-group/create
module.exports.actionEdit = async (req, res) => {
    try {
        if (req.params.id && req.body) {
            await roleModel.updateOne({ _id: req.params.id }, req.body)

            req.flash('success', 'Cập nhật mới thành công');
            const previousUrl = `${system.prefixAdmin}/permissions-group`;
            res.redirect(previousUrl);
        } else {
            req.flash('error', 'Trường giá trị bị thiếu vui lòng kiểm tra lại');
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        }
    } catch (error) {
        {
            req.flash('error', 'Cập nhật thất bại vui lòng kiểm tra các giá trị');
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        }
    }
}

// [GET] /admin/permission-group/detail/:id
module.exports.detail = async (req, res) => {
    try {
        if (req.params.id) {
            const permissionsGroup = await roleModel.findById(req.params.id)
            res.render('admin/pages/permission-group/detail.pug', {
                titlePage: permissionsGroup.title,
                permissionsGroup: permissionsGroup
            });
        } else {
            req.flash('error', 'Tải lên nhóm thất bại')
            const previousUrl = `${system.prefixAdmin}/permissions-group`;
            res.redirect(previousUrl);
        }
    } catch (error) {
        req.flash('error', 'Tải lên nhóm thất bại')
        const previousUrl = `${system.prefixAdmin}/permissions-group`;
        res.redirect(previousUrl);
    }
}

// [DELETE] /admin/permission-group/delete/:id
module.exports.delete = async (req, res) => {
    try {
        if (req.params.id) {
            await roleModel.updateOne({ _id: req.params.id }, { deleted: true });

            req.flash('success', 'xóa thành công nhóm');

            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        } else {
            req.flash('error', 'xóa nhóm thất bại')
            const previousUrl = `${system.prefixAdmin}/permissions-group`;
            res.redirect(previousUrl);
        }
    } catch (error) {
        req.flash('error', 'Tải nhóm lên thất bại')
        const previousUrl = `${system.prefixAdmin}/permissions-group`;
        res.redirect(previousUrl);
    }
}

// [GET] /admin/permissions-group/permissions
module.exports.permissions = async (req, res) => {
    try {
        const permissions = await roleModel.find({ deleted: false, status: 'active' });
        res.render('admin/pages/permission-group/permissions.pug', {
            titlePage: 'Phân quyền',
            permissions: permissions
        });
    } catch (error) {
        req.flash('error', 'Tải trang thất bại');
        res.redirect(`${system.prefixAdmin}/products`);
    }
}

// [PATCH] /admin/permissions-group/action-permissions
module.exports.actionPermissions = async (req, res) => {
    try {
        if (req.body) {
            const listPermissions = req.body['list-permissions'];
            const arrayPermission = JSON.parse(listPermissions);
            for (item of arrayPermission) {
                await roleModel.updateOne({ _id: item.id }, { permissions: item.permissions })
            }
        }

        req.flash('success', 'Cập nhật các quyền thành công');
        res.redirect(`${system.prefixAdmin}/permissions-group/permissions`);
    } catch (error) {
        req.flash('error', 'Cập nhật các quyền thất bại');
        res.redirect(`${system.prefixAdmin}/permissions-group/permissions`);
    }
}