const productRoutes = require('./product.route.js')
const homeRoutes = require('./home.route.js')
const listCategoryMiddeware = require('../../middlewares/listCategory.middeware.js');
const cartMiddeware = require('../../middlewares/cart.middeware.js');
const cartRoute = require('./cart.route.js');

module.exports = (app) => {
    // app.use(listCategoryMiddeware);
    app.use(cartMiddeware);

    app.use('/', listCategoryMiddeware, homeRoutes);
    app.use('/products', listCategoryMiddeware, productRoutes);
    app.use('/cart', listCategoryMiddeware, cartRoute);
};