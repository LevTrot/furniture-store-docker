const orderService = require('../services/ordersService');

exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(200).json(order);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}

exports.putOrder = async (req, res) => {
    try {
        const updatedOrder = await orderService.putOrder(req.params.id, req.body);
        if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
        res.json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update order' });
    }
}

exports.deleteOrder = async (req, res) => {
     try {
        const order = await orderService.deleteOrder(req.params.id)
        if(!order) {
            return res.status(404).json({error: 'Order not found'});
        }
        return res.json({message: 'Order deleted'});
    } catch (err) {
        res.status(500).json({error: 'Failed to delete order'});
    }
}
  