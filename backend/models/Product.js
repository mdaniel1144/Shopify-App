const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  serial: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Use Number for price
  country: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  count: { type: Number, required: true }, // Use Number for count
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;