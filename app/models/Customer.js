const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  card: Number,
  address: String,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

module.exports = mongoose.model('Customer', customerSchema);