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
        const products = await producModel.find(find).skip((paginationPage.currentPage - 1) * paginationPage.limited).limit(paginationPage.limited);

        // formatt price
        products.forEach((product, index, products) => {
            products[index].stringPrice = formattPriceHelper(product.price);
        });

        res.render('admin/pages/product/index.pug', {
            titlePage: 'Quản lý sản phẩm',
            product: products,
            btnStatus: listBtnStatus,
            keywordSreach: keywordSreach,
            paginationPage: paginationPage
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
            await producModel.updateMany(
                { _id: { $in: ids } },
                { $set: { status: status } }
            );

            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        }
    } catch (error) {
        console.log(error);
    }
};