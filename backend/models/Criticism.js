const mongoose = require('mongoose');

const criticismSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateCreated: { type: Date, required: true },
  content: { type: String, required: true },
});

const Criticism = mongoose.model('Criticism', criticismSchema);

module.exports = Criticism;