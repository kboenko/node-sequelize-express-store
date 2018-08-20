const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const addItemToCart = require('../utils').addItem;
const getProductsList = require('../utils').getProductList;
const getCartData = require('../utils').getCartData;
const removeItem = require('../utils').removeItem;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


//get products list from DB
router.get('/products', (req, res) => {
    return res.status(200).send(getProductsList());
});


//get products list from cart
router.get('/cart', (req, res) => {
    return res.status(200).send(getCartData());
});


//add item to cart
router.post('/cart', (req, res) => {
    return res.status(200).send(addItemToCart(req.body.pool));
});


//remove item from cart
router.delete('/cart/:id', (req, res) => {
    return res.status(200).send(removeItem(req.params.id));
});

module.exports = router;