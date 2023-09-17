const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./usersModel');
const connectDB = require('./databaseConfig/databaseConfig');
const usersRouter = require('./usersRouter'); // Import the user routes

app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB
const { signUpModel } = require('./usersModel');



const MONGO_URI = 'mongodb://localhost:27017/group_project'; // Change 'myDatabaseName' to your database name

app.use('/users', usersRouter);






app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
