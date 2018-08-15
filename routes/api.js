const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const basket = require('store');
const _ = require('lodash');

const models = require('../models');
const getCartData = require('./utils/getCartData');
const getError = require('./error/getError');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


//get products list from DB
router.get('/products', (req, res) => {
    models.product.all().then((productsList) => {
        res.status(200).send({data: productsList});
    });
});


//get products list from cart
router.get('/cart', (req, res) => {
    let products = [];
    basket.each( (v,k) => products.push(basket.get(k)));
    res.status(200).send({data: getCartData(products)});
});


//add item to cart
router.post('/cart', (req, res) => {
    if (!req.body.pool) {
        res.status(500).send('Не переданы параметры!')
    }

    let pool = req.body.pool;

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

        res.status(200).send(`Товар ${item.name} в количестве ${pool.quantity} штук успешно добавлен в корзину`);
    })

});


//remove item from cart
router.delete('/cart/:id', (req, res) => {

    models.product.find({
        where: {
            id: req.params.id
        }
    }).then( item => {
        let itemsTmp = [];
        basket.each( (v,k) => itemsTmp.push(v));

        if (!itemsTmp.length || itemsTmp.length === 0) {
            res.status(200).send ('Ваша корзина пуста!');
        } else {

            itemsTmp.forEach(itemTmp => {
                if (itemTmp.id === +req.params.id) {
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

            res.status(200).send(`Item ${req.params.id} has been successfuly deleted from basket`);
        }
    }).catch (err => res.status(400).send(err));

});

module.exports = router;