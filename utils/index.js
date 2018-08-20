const basket = require('store');
const models = require('../models');
const getError = require('../error/getError');
const prepareCartData = require('./prepareCartData');

const addItemToCart = (pool) => {
  if (!pool) {
  return ('Не переданы параметры!');
}

if (!pool.quantity || pool.quantity === 0) {
  throw getError('quantity');
}

if (!pool.id || isNaN(parseInt(pool.id))) {
  throw getError('product');
}

models.product.find({
  where: {
    id: pool.id
  }
}).then( (item) => {

  let itemsTmp = [];
  basket.each( (v,k) => itemsTmp.push(v));

  console.log(`В корзине сейчас ${itemsTmp.length} товаров`);

  let isHaveThisItemInCart = itemsTmp.some((element, index, array) => element.id === pool.id);

  let i;

  if (!isHaveThisItemInCart) {
    if (!itemsTmp.length || itemsTmp.length === 0) {
      i = 0;

    } else {
      i = itemsTmp.length;
    }

    let cartItem = {
      id: item.id,
      quantity: pool.quantity,
      sum: +pool.quantity * item.price
    };

    basket.set(i, cartItem);
  } else {
    basket.clearAll();

    let j = 0;

    itemsTmp.forEach(itemTmp => {
      if (itemTmp.id === pool.id) {

        console.log(itemTmp);

        itemTmp.quantity = itemTmp.quantity + pool.quantity;
        itemTmp.sum = itemTmp.quantity * item.price
      }
    });

    itemsTmp.forEach(item => {basket.set(`${j}`, item); j++ });

  }

  return (`Товар ${item.name} в количестве ${pool.quantity} штук успешно добавлен в корзину`);
})
};


const getProductsList = () => {
  models.product.all().then((productsList) => {
    return {data: productsList};
  });
};


const getCartData = () => {
  let products = [];
  basket.each( (v,k) => products.push(basket.get(k)));
  return {data: prepareCartData(products)};
};


const removeItemFromCart = (itemId) => {
  models.product.find({
    where: {
      id: itemId
    }
  }).then( item => {
    let itemsTmp = [];
    basket.each( (v,k) => itemsTmp.push(v));

    if (!itemsTmp.length || itemsTmp.length === 0) {
      return ('Ваша корзина пуста!');
    } else {

      itemsTmp.forEach(itemTmp => {
        if (itemTmp.id === +itemId) {
          if (itemTmp.quantity > 1) {
            itemTmp.quantity -= 1;
            itemTmp.sum = itemTmp.quantity * item.price;
          } else if (itemTmp.quantity === 1) {
            itemsTmp = [];
          }
        }
      });

      basket.clearAll();
      let i = 0;
      itemsTmp.forEach(item => {basket.set(`${i}`, item); i++ });

      return (`Item ${itemId} has been successfuly deleted from basket`);
    }
  }).catch (err => res.status(400).send(err));
};

exports.addItem = addItemToCart();
exports.getProductList = getProductsList();
exports.getCartData = getCartData();
exports.removeItem = removeItemFromCart();

