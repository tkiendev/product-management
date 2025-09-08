const productModel = require('../../models/product.model');
const categoryModel = require('../../models/product-category.model');

const formattPrice = require('../../helpers/formattPrice');

// [GET] /products
module.exports.index = async (req, res) => {

    try {
        const listProduct = await productModel.find({});
        let newListProduct = listProduct.map((product) => {
            product.formattPrice = formattPrice(product.price);
            product.newPrice = formattPrice((product.price - (product.price * product.discountPercentage / 100)));
            return product;
        });
        newListProduct =
            res.render('user/pages/product/index', {
                titlePagae: 'Trang Sản Phẩm',
                titleHead: 'Danh sách sản phẩm',
                electronics: listProduct,
                fashion: listProduct,
                home: listProduct
            });
    }
    catch (error) {
        res.redirect(`/`);
    }
};

// [GET] /products/:slug
module.exports.index = async (req, res) => {
    async function childCategory(category) {
        const arrayChild = [];

        // Tìm tất cả danh mục con của danh mục hiện tại
        const children = await categoryModel.find({ parent_id: category.id });

        for (const child of children) {
            arrayChild.push(child);

            // Đệ quy để lấy danh mục con của danh mục con
            const subChildren = await childCategory(child);
            arrayChild.push(...subChildren);
        }

        return arrayChild;
    }
    try {

        // lấy ra sản phẩm chung
        const Category = await categoryModel.findOne({ slug: req.params.slug });
        let products = await productModel.find({ category_id: Category.id });

        const arrayChildCategory = await childCategory(Category);
        if (arrayChildCategory.length > 0) {
            for (const item of arrayChildCategory) {
                const array = await productModel.find({ category_id: item.id });
                if (array.length > 0) {
                    for (const product of array) {
                        products.push(product);
                    }
                }
            }
        }

        let newListProduct = products.map((product) => {
            product.formattPrice = formattPrice(product.price);
            product.newPrice = formattPrice((product.price - (product.price * product.discountPercentage / 100)));
            return product;
        });

        // lấy ra các sản phẩm con || bug
        const litsChildCategory_lv1 = await categoryModel.find({ parent_id: Category.id });
        let listProducts_lv1 = [];

        for (const category of litsChildCategory_lv1) {
            const arrayChild_lv2 = await childCategory(category);
            const products_lv1 = await productModel.find({ category_id: category.id });

            let products = [];
            if (products_lv1.length > 0) {
                products = [...products_lv1]
            }
            if (arrayChild_lv2.length > 0) {
                for (const item of arrayChild_lv2) {
                    const array = await productModel.find({ category_id: item.id });
                    if (array.length > 0) {
                        for (const product of array) {
                            products.push(product);
                        }
                    }
                }
            } else {
                const listProductChild = await productModel.find({ category_id: category.id });
                products = [...listProductChild];
            }

            let newProductChild = products.map((product) => {
                product.formattPrice = formattPrice(product.price);
                product.newPrice = formattPrice((product.price - (product.price * product.discountPercentage / 100)));
                return product;
            });

            listProducts_lv1.push({
                title: category.title,
                slug: category.slug,
                products: newProductChild
            });
        }

        res.render('user/pages/product/index', {
            titlePagae: 'Trang Sản Phẩm',
            titleHead: 'Danh sách sản phẩm',
            productsMain: newListProduct,
            listChildCategory: listProducts_lv1
        });
    }
    catch (error) {
        // res.redirect(`/`);
    }
};

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
    try {
        if (req.params.slug) {
            const product = await productModel.findOne({ slug: req.params.slug });
            product.stringNewPrice = formattPrice(product.price - (product.price * product.discountPercentage / 100));
            product.stringPrice = formattPrice(product.price);

            res.render('user/pages/product/detail', {
                titlePagae: product.title,
                product: product
            });
        }
    }
    catch (error) {
        res.redirect(`/products`);
    }
};