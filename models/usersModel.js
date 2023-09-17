const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    nickName: String,
    email: String,
    password: String,
});

// Creating a Model based on the schema
const User = mongoose.model('User', userSchema);

// Function to create a user
const signUpModel = (userData) => {
    const user = new User(userData);
    return user.save();
};

module.exports = {
    User,
    signUpModel
};

