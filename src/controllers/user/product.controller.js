const productModel = require('../../models/product.model');
const formattPrice = require('../../helpers/formattPrice');

// [GET] /products
module.exports.index = async (req, res) => {

    try {
        const electronics = [
            {
                id: 1,
                name: 'iPhone 15 Pro Max',
                image: '/images/products/iphone15.jpg'
            },
            {
                id: 2,
                name: 'Laptop Dell XPS 13',
                image: '/images/products/dellxps13.jpg'
            },
            {
                id: 3,
                name: 'Tai nghe Sony WH-1000XM5',
                image: '/images/products/sonywh1000xm5.jpg'
            },
            {
                id: 4,
                name: 'Smartwatch Samsung Galaxy Watch 6',
                image: '/images/products/galaxywatch6.jpg'
            }
        ];

        const fashion = [
            {
                id: 5,
                name: 'Áo thun nam cotton',
                image: '/images/products/aothun.jpg'
            },
            {
                id: 6,
                name: 'Đầm nữ dáng dài',
                image: '/images/products/damnu.jpg'
            },
            {
                id: 7,
                name: 'Giày sneaker trắng',
                image: '/images/products/sneaker.jpg'
            },
            {
                id: 8,
                name: 'Túi xách thời trang nữ',
                image: '/images/products/tuixach.jpg'
            }
        ];
        const home = [
            {
                id: 9,
                name: 'Máy hút bụi Xiaomi',
                image: '/images/products/hutbui.jpg'
            },
            {
                id: 10,
                name: 'Nồi chiên không dầu Lock&Lock',
                image: '/images/products/noichien.jpg'
            },
            {
                id: 11,
                name: 'Quạt điều hòa Kangaroo',
                image: '/images/products/quat.jpg'
            },
            {
                id: 12,
                name: 'Bộ chăn ga gối cotton',
                image: '/images/products/changa.jpg'
            }
        ];


        res.render('user/pages/product/index', {
            titlePagae: 'Trang Sản Phẩm',
            titleHead: 'Danh sách sản phẩm',
            electronics: electronics,
            fashion: fashion,
            home: home
        });
    }
    catch (error) {
        res.redirect(`/`);
    }
};

// [GET] /products/detail
module.exports.detail = async (req, res) => {
    try {
        if (req.params.slug) {
            const product = await productModel.findOne({ slug: req.params.slug });
            product.stringNewPrice = formattPrice(product.price - (product.price * product.discountPercentage / 100));
            product.stringPrice = formattPrice(product.price);

            res.render('user/pages/product/detail', {
                titlePagae: product.title,
                titleHead: product.title,
                product: product
            });
        }
    }
    catch (error) {
        res.redirect(`/products`);
    }
};