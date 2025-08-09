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
            find.status = query.status;
        }
        else {
            const index = listBtnStatus.findIndex((btn) => {
                return btn.status === '';
            });
            listBtnStatus[index].class = 'active';
        }

        // call DB
        const products = await producMmodel.find(find);

        // formatt price
        products.forEach((product, index, products) => {
            products[index].stringPrice = formattPrice(product.price);
        });
        res.render('admin/pages/product/index.pug', {
            titlePage: 'Quản lý sản phẩm',
            product: products,
            btnStatus: listBtnStatus
        });
    } catch (err) {

    }

};