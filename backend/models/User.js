// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {type: String, required: false},
  username: { type: String, required: true },
  password: { type: String, required: true },
  email:{ type: String, required: true },
  birthday:{ type: Date, required: true },
  country: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;