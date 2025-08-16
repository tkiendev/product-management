// Model
const producModel = require('../../models/product.model.js');

// helper
const formattPriceHelper = require('../../helpers/formattPrice.js');
const filterStatusHelper = require('../../helpers/filterStatus.js');
const seachHelper = require('../../helpers/seach.js');
const paginationPageHelper = require('../../helpers/paginationPage.js');

// [GET]: /admin/products
module.exports.index = async (req, res) => {
    try {
        const find = {
            deleted: false
        };
        const query = req.query;

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
        const products = await producModel.find(find).sort({ position: 1 }).skip((paginationPage.currentPage - 1) * paginationPage.limited).limit(paginationPage.limited);

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
        console.log(error);
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
        console.log(error);
    }
};

// [PATCH]: /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const query = req.body;
        if (query) {
            const status = query.type;
            const ids = query.ids.split(',');

            switch (status) {
                case 'active': {
                    await producModel.updateMany(
                        { _id: { $in: ids } },
                        { $set: { status: status } }
                    );
                    break;
                }
                case 'inactive': {
                    await producModel.updateMany(
                        { _id: { $in: ids } },
                        { $set: { status: status } }
                    );
                    break;
                }
                case 'delete': {
                    await producModel.updateMany(
                        { _id: { $in: ids } },
                        { $set: { deleted: true } }
                    );
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
                    break;
                }
                default:
                    break;
            }

            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        }
    } catch (error) {
        console.log(error);
    }
};

// [DLETE]: /admin/products/change-dalete
module.exports.changeDelete = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            await producModel.updateOne({ _id: id }, { deleted: true });
        }
        req.flash('success', 'Xóa thành công');
        const previousUrl = req.get('Referer') || '/';
        res.redirect(previousUrl);
    } catch (error) {
        console.log(error);
    }
};