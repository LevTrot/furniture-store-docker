const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/productsController');

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.put('/:id', productController.putProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
