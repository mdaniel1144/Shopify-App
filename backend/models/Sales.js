const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()},
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  products: [
    {
      itemID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      count: { type: Number, required: true },
    },
  ],
  status: { type: String, required: true, enum: ['Progress', 'Completed', 'Cancelled'] },
  totalPrice: { type: Number, required: true, default: 0 },
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;