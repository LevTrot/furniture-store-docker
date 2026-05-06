const productService = require('../services/productsService');

exports.createProduct = async (req, res) => {
     try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
      } catch (err) {
        res.status(500).json({ error: 'Failed to add product' });
      }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

exports.putProduct = async (req, res) => {
    try {
        const product = await productService.putProduct(req.params.id, req.body);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
}
  