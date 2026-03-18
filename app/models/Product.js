const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    material: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
});

productSchema.index({ material: 1 });

module.exports = mongoose.model('Product', productSchema);