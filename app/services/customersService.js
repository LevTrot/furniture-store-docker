const Customer = require('../models/Customer');

exports.createCustomer = async (body) => {
    const { name, email, card, address } = body;
    const customer = await Customer.create({ name, email, card, address });
    return customer;
}

exports.getCustomers = async () => {
    const customers = await Customer.find();
    return customers;
}

exports.putCustomer = async ({ id, updateData }) => {
    const customer = await Customer.findByIdAndUpdate(id, updateData, { new: true });
    return customer;
}


exports.deleteCustomer = async (id) => {
    const customer = await Customer.findByIdAndDelete(id);
    return customer;
}