const producMmodel = require('../../models/product.model.js');

module.exports.index = async (req, res) => {
    const formattPrice = (number) => {
        const string = number.toString();
        const charArray = string.split('');
        let count = 1;
        for (let i = charArray.length - 1; i >= 0; i--) {
            if (count % 3 === 0) {
                charArray.splice(i, 0, '.');
            }
            count++;
        }
        const formatted = charArray.join('');
        return formatted;
    }
    try {
        const find = {
            deleted: false
        };
        const query = req.query;

        // req status
        if (query.status) {
            find.status = query.status;
        }
        const listBtnStatus = [
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
        if (query.status) {
            const index = listBtnStatus.findIndex((btn) => {
                return btn.status === query.status;
            });
            listBtnStatus[index].class = 'active';
        }
        else {
            const index = listBtnStatus.findIndex((btn) => {
                return btn.status === '';
            });
            listBtnStatus[index].class = 'active';
        }

        // red form search
        let keywordSreach = '';
        if (query.keyword) {
            let regex = new RegExp(query.keyword, 'i');
            find.title = regex;
            keywordSreach = query.keyword;
        }

        // pagination page
        const paginationPage = {
            limited: 4,
            currentPage: 1
        }
        paginationPage.totalPage = Math.ceil(await producMmodel.countDocuments({ deleted: false }) / paginationPage.limited);
        if (query.page && !isNaN(query.page)) {
            paginationPage.currentPage = Number(query.page);
        }

        // call DB
        const products = await producMmodel.find(find).skip((paginationPage.currentPage - 1) * paginationPage.limited).limit(paginationPage.limited);

        // formatt price
        products.forEach((product, index, products) => {
            products[index].stringPrice = formattPrice(product.price);
        });
        res.render('admin/pages/product/index.pug', {
            titlePage: 'Quản lý sản phẩm',
            product: products,
            btnStatus: listBtnStatus,
            keywordSreach: keywordSreach,
            paginationPage: paginationPage
        });
    } catch (err) {

    }

};