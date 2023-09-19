const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  nickName: String,
  email: String,
  password: String,
});

// Creating a Model based on the schema
const User = mongoose.model("User", userSchema);

// Function to create a user
const signUpModel = (userData) => {
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    nickName: userData.nickName,
    email: userData.email,
    password: userData.pass,
  });
  return user.save();
};

async function getUserByEmailModel(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  User,
  signUpModel,
  getUserByEmailModel,
};
