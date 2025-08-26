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
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        }
    }
}