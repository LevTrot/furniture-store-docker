const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customersController')

router.post('/', customerController.createCustomer);
router.get('/', customerController.getCustomers);
router.put('/:id', customerController.putCustomer);
router.delete('/:id', customerController.deleteCustomer);

  module.exports = router;