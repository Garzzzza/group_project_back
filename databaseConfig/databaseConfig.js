const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/group_project';

const connectDB = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Failed to connect to MongoDB', err));
};

module.exports = connectDB;
