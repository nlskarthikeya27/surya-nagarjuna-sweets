const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orders');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);

// Routes
app.use('/api/products', productRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.log('MongoDB error:', err));

app.get('/', (req, res) => {
  res.json({ message: 'Surya Nagarjuna Sweets Backend is running! 🎉' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});