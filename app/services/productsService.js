const Product = require('../models/Product');

exports.createProduct = async (body) => {
    const { name, material, price, stock } = body;
    const product = await Product.create({ name, material, price, stock });
    return product;
}

exports.getProducts = async () => {
    const products = await Product.find();
    return products;
}

exports.putProduct = async (id, updateData) => {
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    return product;
}


exports.deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    return product;
}