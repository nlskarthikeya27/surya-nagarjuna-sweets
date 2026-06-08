const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Place new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json({ message: 'Order placed successfully!', order: saved });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders (for you to view)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;