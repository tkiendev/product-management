const dashboardRoutes = require('./dashboard.route.js');
const productRoutes = require('./product.route.js');
const productCategoryRoute = require('./product-category.route.js');

const system = require('../../config/systems.js')
module.exports = (app) => {
    app.use(`${system.prefixAdmin}/dashboard`, dashboardRoutes);
    app.use(`${system.prefixAdmin}/products`, productRoutes);
    app.use(`${system.prefixAdmin}/product-category`, productCategoryRoute);
};