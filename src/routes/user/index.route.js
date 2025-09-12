const productRoutes = require('./product.route.js')
const homeRoutes = require('./home.route.js')
const cartRoute = require('./cart.route.js');
const checkoutRoute = require('./checkout.route.js');
const userRoute = require('./user.route.js');

const listCategoryMiddeware = require('../../middlewares/listCategory.middeware.js');
const cartMiddeware = require('../../middlewares/cart.middeware.js');
const checkLoginUserMiddeware = require('../../middlewares/checkLoginUser.middeware.js')

module.exports = (app) => {
    app.use(listCategoryMiddeware);
    app.use(checkLoginUserMiddeware);
    app.use(cartMiddeware);

    app.use('/', homeRoutes);
    app.use('/products', productRoutes);
    app.use('/cart', cartRoute);
    app.use('/checkout', checkoutRoute);
    app.use('/user', userRoute);

};