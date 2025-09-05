const categoryModel = require('../models/product-category.model');
const buildRobustTree = require('../helpers/buildRobustTree');
module.exports = async (req, res, next) => {
    try {
        let catagory = await categoryModel.find({ deleted: false, status: 'active' });

        const newCatagory = catagory.map(item => { return item._doc });
        console.log(newCatagory);
        res.locals.catagory = await buildRobustTree(newCatagory);

        next();
    } catch (error) {
        next();
    }
}