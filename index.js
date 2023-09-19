const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/usersModel");
const connectDB = require("./databaseConfig/databaseConfig");
const usersRouter = require("./routes/usersRoute"); // Import the user routes
// const {
//   passwordMatch,
//   isNewUser,
//   hashPwd,
// } = require("./middlewares/middlewares");

app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB

app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
