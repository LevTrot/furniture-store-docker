const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Product = require('../models/Product');

exports.createOrder = async ({ customerId, productIds }) => {
    const customer = await Customer.findById(customerId);
    if (!customer) throw { status: 404, message: 'Customer not found' };

    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
        throw { status: 400, message: 'Some products not found' };
    }

    const order = await Order.create({
        customer: customer._id,
        products: productIds
    });

    await Customer.findByIdAndUpdate(customerId, {
        $push: { orders: order._id }
    });

    return order;
};


exports.getOrders = async () => {
    const orders = await Order.find().populate('customer').populate('products');

    return orders;
}

exports.putOrder = async ({ customerId, productIds }) => {
    const updateData = {};
        if (customerId) {
            const customer = await Customer.findById(customerId);
            if (!customer) throw { status: 404, message: 'Customer not found' };
            updateData.customer = customerId;
        }
      
        if (productIds && productIds.length > 0) {
            const products = await Product.find({ _id: { $in: productIds } });
            if (products.length !== productIds.length) {
             throw { status: 404, message: 'Some products not found' };
            }
            updateData.products = productIds;
        }
      
          const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            ).populate('customer').populate('products');

            return updatedOrder;
}

exports.deleteOrder = async (id) => {
    const order = await Order.findByIdAndDelete(id);
    return order;
}