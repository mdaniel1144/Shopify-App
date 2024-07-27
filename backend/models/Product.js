const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  serial: { type: String, required: true },     // Serial number of the product, required field
  name: { type: String, required: true },       // Name of the product, required field
  price: { type: Number, required: true },      // Price of the product, required field (Number type)
  country: { type: String, required: true },    // Country of origin, required field
  date: { type: Date, required: true },         // Date of manufacture or release, required field
  description: { type: String, required: true },// Description of the product, required field
  count: { type: Number, required: true }       // Stock count, required field (Number type)
});

// Create the Product model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;