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

app.use(
  cors({
    origin: "https://game-app-client-seven.vercel.app/", // Specify your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers if needed
  })
);

connectDB();

app.use("/users", usersRouter);
app.use("/scores", scoresRouter);
app.use("/kgame", kGameRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
