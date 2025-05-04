const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.post('/', async (req, res) => {
    try {
      const { name, email, card, address } = req.body;
      const customer = await Customer.create({ name, email, card, address });
      res.status(201).json(customer);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add customer' });
    }
  });

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
});

router.delete('/:id', async (req, res) =>{
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found'});
        res.json({ message: 'Customer deleted'});
    } catch (err) {
        res.status(500).json({error: 'Failed to delete customer'});
    }
});

  module.exports = router;