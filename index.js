const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/usersModel");
const connectDB = require("./databaseConfig/databaseConfig");
const usersRouter = require("./routes/usersRoute");
const scoresRouter = require("./routes/scoresRoute");
const kGameRouter = require("./routes/kGameRoute");

app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB

app.use("/users", usersRouter);
app.use("/scores", scoresRouter);
app.use("/kgame", kGameRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
