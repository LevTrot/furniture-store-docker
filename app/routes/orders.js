const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.put('/:id', orderController.putOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;