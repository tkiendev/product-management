// [GET] /
module.exports.index = (req, res) => {
    res.render('user/pages/home', {
        titlePagae: 'trang chu',
        titleHead: 'trang chu'
    });
};
