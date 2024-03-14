require("dotenv").config();
const mongoose = require("mongoose");

// connect

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB CONNECTED Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

dbConnect();
