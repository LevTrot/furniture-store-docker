const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

router.get('/orders-per-customer', reportsController.ordersPerCustomer);
router.get('/orders-by-date', reportsController.ordersByDate);
router.get('/total-spend-per-customer', reportsController.totalSpentPerCustomer);
router.get('/orders-by-email', reportsController.ordersByEmail);
router.get('/products-over-price', reportsController.productsOverPrice);
router.get('/sync-customer-orders', reportsController.syncCustomerOrders);

module.exports = router;