module.exports.index = (req, res) => {
    const permissionGroup = []
    res.render('admin/pages/permission-group.pug', {
        titlePage: 'Nhóm phần quyền',
        permissionGroup: permissionGroup
    });
}