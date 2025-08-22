// Model
const producModel = require('../../models/product.model.js');

// helper
const formattPriceHelper = require('../../helpers/formattPrice.js');
const filterStatusHelper = require('../../helpers/filterStatus.js');
const seachHelper = require('../../helpers/seach.js');
const paginationPageHelper = require('../../helpers/paginationPage.js');
const system = require('../../config/systems.js');
const products = require('../../models/product.model.js');

// [GET]: /admin/products
module.exports.index = async (req, res) => {
    try {
        const find = {
            deleted: false
        };
        const query = req.query;

        // value sort
        const sort = {}
        if (req.query.keywordSort && req.query.valueSort) {
            sort[req.query.keywordSort] = req.query.valueSort;
        } else {
            sort.position = 1;
        }
        // value option 
        let listOption = [
            {
                name: '- Chọn hành động -',
                type: '',
            },
            {
                name: 'Hoạt Động',
                type: 'active',
            },
            {
                name: 'Dừng Hoạt động',
                type: 'inactive',
            },
            {
                name: 'Xóa sản phẩm',
                type: 'delete',
            },
            {
                name: 'Cập nhật vị trí',
                type: 'position',
            }
        ];
        // req status
        let listBtnStatus = [
            {
                name: 'Tất cả',
                status: '',
                class: ''
            },
            {
                name: 'Hoạt Động',
                status: 'active',
                class: ''
            },
            {
                name: 'Dừng Hoạt động',
                status: 'inactive',
                class: ''
            }
        ];
        listBtnStatus = filterStatusHelper(query, listBtnStatus);
        if (query.status) {
            find.status = query.status;
        }

        // red form search
        let keywordSreach = '';
        if (query.keyword) {
            keywordSreach = seachHelper(query).keywordSreach;
            find.title = seachHelper(query).title;
        }

        // pagination page
        let paginationPage = {
            limited: 4,
            currentPage: 1
        }
        paginationPage = await paginationPageHelper(paginationPage, query, await producModel.countDocuments({ ...find, deleted: false }));

        // call DB
        const products = await producModel.find(find).sort(sort).skip((paginationPage.currentPage - 1) * paginationPage.limited).limit(paginationPage.limited);

        // formatt price
        products.forEach((product, index, products) => {
            products[index].stringPrice = formattPriceHelper(product.price);
        });

        res.render('admin/pages/product/index.pug', {
            titlePage: 'Quản lý sản phẩm',
            product: products,
            btnStatus: listBtnStatus,
            keywordSreach: keywordSreach,
            paginationPage: paginationPage,
            listOption: listOption
        });
    } catch (err) {
        req.flash('error', 'Cập nhật không thành công');
        res.redirect(`${system.prefixAdmin}/products`);
    }
};

// [PATCH]: /admin/products/change-stauts/:status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        if (req.params) {
            const productStatus = req.params.status;
            const productId = req.params.id;
            await producModel.updateOne(
                { _id: productId },
                { $set: { status: productStatus } }
            );
            req.flash('success', `Cập nhật "${productStatus}" thành công`);
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);

        }
    } catch (error) {
        req.flash('error', 'Cập nhật không thành công');
        res.redirect(`${system.prefixAdmin}/products`);
    }
};

// [PATCH]: /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const query = req.body;

        if (query) {
            let success = '';
            const status = query.type;
            const ids = query.ids.split(',');

            switch (status) {
                case 'active': {
                    await producModel.updateMany(
                        { _id: { $in: ids } },
                        { $set: { status: status } }
                    );
                    success = `Đã cập nhật thành công thành "Hoạt động"`;
                    break;
                }
                case 'inactive': {
                    await producModel.updateMany(
                        { _id: { $in: ids } },
                        { $set: { status: status } }
                    );
                    success = `Đã cập nhật thành công thành "Dừng hoạt động"`;
                    break;
                }
                case 'delete': {
                    await producModel.updateMany(
                        { _id: { $in: ids } },
                        { $set: { deleted: true } }
                    );
                    success = `Đã xóa thành công`;
                    break;
                }
                case 'position': {
                    let ids = query.ids.split(',');
                    let position = [];
                    ids = ids.map(item => {
                        let [id, p] = item.split('-');
                        position.push(parseInt(p));
                        return id;
                    });
                    ids.forEach(async (id, index) => {
                        await producModel.updateOne(
                            { _id: id },
                            { $set: { position: position[index] } }
                        );
                    });
                    success = `Thay đổi vị trí thành công`;
                    break;
                }
                default:
                    req.flash('error', 'Lựa chọn không hợp lệ');
                    break;
            }

            req.flash('success', success);

            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        }
    } catch (error) {
        req.flash('error', 'Cập nhật không thành công');
        res.redirect(`${system.prefixAdmin}/products`);
    }
};

// [DLETE]: /admin/products/change-dalete
module.exports.changeDelete = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            await producModel.updateOne({ _id: id }, { deleted: true });
        }

        req.flash('success', 'Xóa thành công sản phẩm');

        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
    } catch (error) {
        req.flash('error', 'Cập nhật không thành công');
        res.redirect(`${system.prefixAdmin}/products`);
    }
};

// [GET]: /admin/products/create
module.exports.create = async (req, res) => {
    try {
        res.render('admin/pages/product/create.pug', {
            titlePage: 'Thêm mới sản phẩm'
        });
    } catch (error) {
        req.flash('error', 'Cập nhật không thành công');
        res.redirect(`${system.prefixAdmin}/products`);
    }
};

// [POST]: /admin/products/create
module.exports.actionCreate = async (req, res) => {
    try {
        if (req.body) {
            const product = req.body;
            product.position = parseInt((await producModel.countDocuments({ deleted: false })) + 1);
            product.price = parseInt(product.price);
            product.discountPercentage = parseInt(product.discountPercentage);
            product.stock = parseInt(product.stock);

            await (new producModel(product)).save();
            req.flash('success', 'Tạo sản phẩm thành công');

            const previousUrl = `${system.prefixAdmin}/products`;
            res.redirect(previousUrl);

        }
    } catch (error) {
        req.flash('error', 'Cập nhật không thành công');
        res.redirect(`${system.prefixAdmin}/products`);
    }
};

// [GET]: /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        if (req) {
            const checkId = await producModel.findById(req.params.id);
            if (checkId) {
                const product = await producModel.findById(req.params.id);
                res.render('admin/pages/product/edit.pug', {
                    titlePage: 'Sửa sản phẩm',
                    product: product
                });
            } else {
                req.flash('error', 'Tải lên sản phẩm thất bại');
                res.redirect(`${system.prefixAdmin}/products`);
                return;
            }
        }
    } catch (error) {
        req.flash('error', 'Cập nhật không thành công');
        res.redirect(`${system.prefixAdmin}/products`);
    }
};

// [POST]: /admin/products/edit/:id
module.exports.actionEdit = async (req, res) => {
    try {
        if (req.params.id && req.body) {

            const product = req.body;
            product.position = parseInt(req.body.position);
            product.price = parseInt(product.price);
            product.discountPercentage = parseInt(product.discountPercentage);
            product.stock = parseInt(product.stock);

            await producModel.updateOne({ _id: req.params.id }, product);

            req.flash('success', 'cập nhật sản phẩm thành công');
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);

        }
    } catch (error) {
        req.flash('error', 'Sản phẩm không tồn tại');
        res.redirect(`${system.prefixAdmin}/products`);
    }
};

// [POST]: /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        if (req) {
            const product = await producModel.findById({ _id: req.params.id });
            res.render('admin/pages/product/detail.pug', {
                titlePage: 'Chi tiết sản phẩm',
                product: product
            });
        }
    } catch (error) {
        req.flash('error', 'Sản phẩm không tồn tại');
        res.redirect(`${system.prefixAdmin}/products`);
    }
};