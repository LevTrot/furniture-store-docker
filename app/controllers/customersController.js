const customerService = require('../services/customersService');

exports.createCustomer = async (req, res) => {
    try {
      const customer = await customerService.createCustomer(req.body);
      res.status(201).json(customer);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add customer' });
    }
}

exports.getCustomers = async (req, res) => {
    try {
        const customers = await customerService.getCustomers();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
}

exports.putCustomer = async (req, res) => {
    try {
        const customer = await customerService.putCustomer(req.params.id, req.body);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
}

exports.deleteCustomer = async (req, res) => {
     try {
        const customer = await customerService.deleteCustomer(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found'});
        res.json({ message: 'Customer deleted'});
    } catch (err) {
        res.status(500).json({error: 'Failed to delete customer'});
    }
}
  