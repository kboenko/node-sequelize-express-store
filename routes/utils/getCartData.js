const _ = require('lodash');

module.exports = (products) => {

    let totalSum = 0;
    let productCount = 0;
    let ids = [];
    let productsInfo = [];

    products.forEach(item => {
        totalSum += item.sum;
        productCount += item.quantity;
        ids.push(item.id);
    });

    return {
        total_sum: totalSum,
        product_count: productCount,
        products: products
    }

};