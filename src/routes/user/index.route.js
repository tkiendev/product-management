const productRoutes = require('./product.route.js')
const homeRoutes = require('./home.route.js')
const listCategoryMiddeware = require('../../middlewares/listCategory.middeware.js');

module.exports = (app) => {
    // app.use(listCategoryMiddeware);
    app.use('/', listCategoryMiddeware, homeRoutes);
    app.use('/products', listCategoryMiddeware, productRoutes);
};