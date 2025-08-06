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
        const products = await producMmodel.find({
            deleted: false
        });

        // formatt price
        products.forEach((product, index, products) => {
            products[index].stringPrice = formattPrice(product.price);
        });

        res.render('admin/pages/product/index.pug', {
            product: products
        });
    } catch (err) {

    }

};