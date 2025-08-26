const permissionGroupModel = require('../../models/permission-group.model.js')

// [GET] /admin/permission-group
module.exports.index = async (req, res) => {
    const permissionsGroup = await permissionGroupModel.find();
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
            const permissionGroup = new permissionGroupModel(req.body);
            await permissionGroup.save();

            req.flash('success', 'Tạo mới thành công');
            const previousUrl = '/admin/permissions-group';
            res.redirect(previousUrl);
        } else {
            req.flash('error', 'Tạo mới thất bại')
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        }
    } catch (error) {
        {
            req.flash('error', 'Không thế tải trang')
            const previousUrl = '/admin/permissions-group';
            res.redirect(previousUrl);
        }
    }
}

// [GET] /admin/permission-group/edit/:id
module.exports.edit = async (req, res) => {
    try {
        if (req.params.id) {
            const permissionsGroup = await permissionGroupModel.findById(req.params.id)
            res.render('admin/pages/permission-group/edit.pug', {
                titlePage: 'Chỉnh sửa nhóm phần quyền',
                permissionsGroup: permissionsGroup
            });
        } else {
            req.flash('error', 'Tải lên sản phẩm thất bại')
            const previousUrl = '/admin/permissions-group';
            res.redirect(previousUrl);
        }
    } catch (error) {
        req.flash('error', 'Tải lên sản phẩm thất bại')
        const previousUrl = '/admin/permissions-group';
        res.redirect(previousUrl);
    }
}

// [PATCH] /admin/permission-group/create
module.exports.actionEdit = async (req, res) => {
    try {
        if (req.params.id && req.body) {
            await permissionGroupModel.updateOne({ _id: req.params.id }, req.body)

            req.flash('success', 'Cập nhật mới thành công');
            const previousUrl = '/admin/permissions-group';
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
            const permissionsGroup = await permissionGroupModel.findById(req.params.id)
            res.render('admin/pages/permission-group/detail.pug', {
                titlePage: permissionsGroup.title,
                permissionsGroup: permissionsGroup
            });
        } else {
            req.flash('error', 'Tải lên sản phẩm thất bại')
            const previousUrl = '/admin/permissions-group';
            res.redirect(previousUrl);
        }
    } catch (error) {
        req.flash('error', 'Tải lên sản phẩm thất bại')
        const previousUrl = '/admin/permissions-group';
        res.redirect(previousUrl);
    }
}