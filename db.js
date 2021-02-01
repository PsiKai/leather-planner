if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config(); 
}

const mongoose = require("mongoose");
// const config = require("config")
const mongoURI = process.env.MONGO_URI

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };

module.exports = connectDB;