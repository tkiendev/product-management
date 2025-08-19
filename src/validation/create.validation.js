module.exports.create = (req, res, next) => {
    if (req) {
        if (req.body.title === '') {
            req.flash('error', 'vui lòng nhập tên sản phẩm');
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
            return;
        }
    } else {
        res.redirect('/admin/products');
    }
    next();
}
