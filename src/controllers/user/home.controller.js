// [GET] /
module.exports.index = (req, res) => {

    res.render('user/pages/home/index.pug', {
        titlePagae: 'trang chu',
        titleHead: 'trang chu',

        categories: [
            { name: 'Điện thoại', slug: 'dien-thoai', image: '/images/phone.jpg' },
            { name: 'Thời trang', slug: 'thoi-trang', image: '/images/fashion.jpg' },
            { name: 'Gia dụng', slug: 'gia-dung', image: '/images/home.jpg' }
        ],
        newProducts: [
            { id: 1, name: 'iPhone 15 Pro', price: '29.990.000', image: '/images/iphone.jpg' },
            { id: 2, name: 'Áo Hoodie Nam', price: '499.000', image: '/images/hoodie.jpg' },
            { id: 3, name: 'Máy hút bụi Xiaomi', price: '2.990.000', image: '/images/vacuum.jpg' },
            { id: 4, name: 'Tai nghe Bluetooth', price: '799.000', image: '/images/headphones.jpg' }
        ]
    });
};

module.exports.about = (req, res) => {

    res.render('user/pages/home/about.pug', {
        titlePagae: 'trang chu',
        titleHead: 'trang chu',
    });
};
