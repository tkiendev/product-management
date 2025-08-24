const productCategoryModel = require('../../models/product-category.model.js');
function buildRobustTree(flatList) {
    const nodeMap = new Map();

    // Bước 1: Chuẩn hóa dữ liệu và tạo node với children
    flatList.forEach(item => {
        const id = item._id.toString();
        nodeMap.set(id, { ...item, children: [] });
    });

    const tree = [];

    // Bước 2: Gắn phần tử con vào phần tử cha
    flatList.forEach(item => {
        const id = item._id.toString();
        const parent_id = item.parent_id?.toString();

        if (parent_id && nodeMap.has(parent_id)) {
            nodeMap.get(parent_id).children.push(nodeMap.get(id));
        } else {
            // Nếu không có cha hoặc cha không tồn tại => là gốc
            tree.push(nodeMap.get(id));
        }
    });

    return tree;
}

// [GET] admin/product-category
module.exports.index = async (req, res) => {
    try {
        let productCategory = await productCategoryModel.find({ deleted: false });
        productCategory = productCategory.map((item) => {
            return item._doc;
        });
        const newProductCategory = buildRobustTree(productCategory);

        res.render('admin/pages/product-category/index.pug', {
            productCategory: newProductCategory
        });
    } catch {
        req.flash('error', 'cập nhật danh mục thất bại');
        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
    }
}

// [GET] admin/product-category/create
module.exports.create = async (req, res) => {

    try {
        let productCategory = await productCategoryModel.find({ deleted: false });
        productCategory = productCategory.map((item) => {
            return item._doc;
        });
        const newProductCategory = buildRobustTree(productCategory);

        res.render('admin/pages/product-category/create.pug', {
            productCategory: newProductCategory
        });
    } catch (error) {
        console.log(error);
        req.flash('error', 'tải trang thất bại');
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