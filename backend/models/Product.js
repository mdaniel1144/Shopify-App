const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()},
  serial: { type: String, required: true },     // Serial number of the product, required field
  name: { type: String, required: true },       // Name of the product, required field
  price: { type: Number, required: true },      // Price of the product, required field (Number type)
  category: { type: String, required: false },    // category of origin, required field
  date: { type: Date, required: false },         // Date of manufacture or release, required field
  description: { type: String, required: false },// Description of the product, required field
  count: { type: Number, required: false },      // Stock count, required field (Number type)
  brand: { type: String, required: false },
  image: { type: String, required: false },    
});

// Create the Product model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;