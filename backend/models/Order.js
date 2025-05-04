const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  date: { type: Date, default: Date.now },
}, {timestamps: true});

orderSchema.index({ date: -1 });

module.exports = mongoose.model('Order', orderSchema);
