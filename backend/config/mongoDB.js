const mongoose = require('mongoose');

const uri = "mongodb+srv://mdaniel114411:NKLVNHSG114411@cluster0.nlfkhqh.mongodb.net/shopfi"

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { connectDB };