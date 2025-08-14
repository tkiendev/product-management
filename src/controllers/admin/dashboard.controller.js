// [GET]: /admin/dashboard
module.exports.index = (req, res) => {
    titlePage: 'Tổng quan'
    res.render('admin/pages/dashboard/index.pug');
};