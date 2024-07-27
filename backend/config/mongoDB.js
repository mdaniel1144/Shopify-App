const mongoose = require('mongoose');

const connectDB = async () => {
  try {//mongodb+srv://mdaniel114411:<password>@cluster0.nlfkhqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false, //#
      useCreateIndex: true    //#
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};


module.exports = connectDB;