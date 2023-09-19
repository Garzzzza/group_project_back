const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://root:root@amitgerzee.2c1awvp.mongodb.net/group_project";

const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};

module.exports = connectDB;
