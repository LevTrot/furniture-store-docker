const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Product = require('../models/Product');

module.exports = {
  // 1. Кол-во заказов по клиенту
  async ordersPerCustomer(req, res) {
    try {
    const result = await Order.aggregate([
      { $group: { _id: "$customer", totalOrders: { $sum: 1 } } },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "_id",
          as: "customer"
        }
      },
      {
        $unwind: { 
            path: "$customer", 
            preserveNullAndEmptyArrays: true
        }
      }, 
        {
        $project: {
          customerName: "$customer.name",
          totalOrders: 1
        }
      }
    ]);
    res.json(result);
    } catch (err) {
        res.status(500).json({error: error.message});
    }
  },

  // 2. Общая сумма заказов по клиенту
  async totalSpentPerCustomer(req, res) {
    const result = await Order.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "products"
        }
      },
      {
        $addFields: {
          totalPrice: { $sum: "$products.price" }
        }
      },
      {
        $group: {
          _id: "$customer",
          totalSpent: { $sum: "$totalPrice" }
        }
      },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "_id",
          as: "customer"
        }
      },
      { $unwind: "$customer" },
      {
        $project: {
          customerName: "$customer.name",
          totalSpent: 1
        }
      }
    ]);
    res.json(result);
  },

  // 3. Кол-во заказов по дате
  async ordersByDate(req, res) {
    const result = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } }
    ]);
    res.json(result);
  },

  // 4. Поиск заказов по email
  async ordersByEmail(req, res) {
    const customer = await Customer.findOne({ email: req.query.email });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    const orders = await Order.find({ customer: customer._id }).populate('products');
    res.json(orders);
  },

  // 5. Продукты дороже X
  async productsOverPrice(req, res) {
    const minPrice = parseFloat(req.query.price || 0);
    const products = await Product.find({ price: { $gt: minPrice } });
    res.json(products);
  },
  // 6. Для синхронизации заказов в покупателе(порой может автоматическая версия не работать)
  async syncCustomerOrders(req, res) {
    try {
        const orders = await Order.find();

        for (const order of orders) {
            await Customer.findByIdAndUpdate(
                order.customer,
                { $addToSet: { orders: order._id }}
            );
        }

        res.status(201).json({message: "Customer orders synced successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to sync customer orders"});
    }
}
};