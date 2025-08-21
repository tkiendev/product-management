module.exports.create = (req, res, next) => {
    if (req.body) {
        if (!req.body.title) {
            req.flash('error', 'Vui lòng nhập tên sản phẩm');
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
            return;
        } else {
            next();
        }
    } else {
        req.flash('error', 'Tạo lỗi vui lòng kiểm tra các trường');
        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
        return;
    }
}
