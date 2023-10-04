const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  nickname: String,
  email: String,
  picture: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const signUpModel = (userData) => {
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    nickname: userData.nickname,
    email: userData.email,
    picture: userData.picture,
    password: userData.password,
  });
  user.save();
};

async function getUserByEmailModel(email) {
  try {
    const userByEmail = await User.findOne({ email: email });

    return userByEmail;
  } catch (err) {
    console.log(err);
  }
}

async function getUserByNicknameModel(nickname) {
  try {
    const userByNickname = await User.findOne({ nickname: nickname });
    return userByNickname;
  } catch (err) {
    console.log(err);
  }
}

async function getUserByIdModel(_id) {
  try {
    const user = await User.findOne({ _id: _id });

    return user;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  User,
  signUpModel,
  getUserByEmailModel,
  getUserByNicknameModel,
  getUserByIdModel,
};
