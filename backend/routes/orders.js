const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Product = require('../models/Product');

router.post('/', async(req, res) => {
    try {
        const  {customerId, productIds } = req.body;

        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({error: 'Customer not found'});

        const products = await Product.find({_id : { $in: productIds}});
        if (products.length !== productIds.length) {
            res.status(400).json({error: 'Some products not found'});
        }

        const order = await Order.create({
            customer: customer._id,
            products: productIds
        });

        await Customer.findByIdAndUpdate(
            customerId,
            { $push: { orders: order._id}}
        );

        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('customer').populate('products');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { customerId, productIds } = req.body;
  
    const updateData = {};
    if (customerId) {
        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        updateData.customer = customerId;
    }
  
    if (productIds && productIds.length > 0) {
        const products = await Product.find({ _id: { $in: productIds } });
        if (products.length !== productIds.length) {
          return res.status(400).json({ error: 'Some products not found' });
        }
        updateData.products = productIds;
    }
  
      const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('customer').populate('products');
  
        if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
  
        res.json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update order' });
    }
});  

router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order) {
            return res.status(404).json({error: 'Order not found'});
        }
        return res.json({message: 'Order deleted'});
    } catch (err) {
        res.status(500).json({error: 'Failed to delete order'});
    }
});

module.exports = router;