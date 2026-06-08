const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products (with filters)
router.get('/', async (req, res) => {
  try {
    const { category, isSugarFree, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (isSugarFree) filter.isSugarFree = isSugarFree === 'true';
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;