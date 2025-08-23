const productCategoryModel = require('../../models/product-category.model.js');

// [GET] admin/product-category
module.exports.index = async (req, res) => {
    try {
        let productCategory = await productCategoryModel.find({ deleted: false });
        res.render('admin/pages/product-category/index.pug', {
            productCategory: productCategory
        });
    } catch {
        req.flash('error', 'cập nhật danh mục thất bại');
        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
    }
}

// [GET] admin/product-category/create
module.exports.create = async (req, res) => {
    // function treeCategory(productCategory) {
    //     let treeCategory = []
    //     productCategory.forEach((item) => {

    //     });
    // }
    try {
        let productCategory = await productCategoryModel.find({ deleted: false });
        res.render('admin/pages/product-category/create.pug', {
            productCategory: productCategory
        });
    } catch (error) {
        req.flash('success', 'tải trang thất bại')
        res.redirect('/admin/product-category');
    }
}

// [POST] admin/product-category/create
module.exports.actionCreate = async (req, res) => {
    try {
        if (req.body) {
            const category = req.body;
            if (req.body.position === '') {
                const countDocuments = parseInt(await productCategoryModel.countDocuments({}))
                if (countDocuments > 0) {
                    category.position = countDocuments + 1;
                } else {
                    category.position = 1;
                }
            }

            await productCategoryModel.create(category);

            req.flash('success', 'Tạo mới danh mục thành công')
            res.redirect('/admin/product-category');
        }
    } catch (error) {
        req.flash('error', 'Tạo mới danh mục thất bại');
        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
    }

}