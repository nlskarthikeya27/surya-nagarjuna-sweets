const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // 'sweet', 'hot', 'ghee'
  isAvailable: { type: Boolean, default: true },
  image: { type: String },
  description: { type: String },
  isSugarFree: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);