const bcrypt = require("bcrypt");
const {
  getUserByEmailModel,
  getUserByNicknameModel,
} = require("../models/usersModel");

function passwordMatch(req, res, next) {
  if (req.body.password !== req.body.rePassword) {
    return res.status(400).send("Passwords do not match");
  }
  next();
}

async function isNewUser(req, res, next) {
  const userByEmail = await getUserByEmailModel(req.body.email);
  const userByNickname = await getUserByNicknameModel(req.body.nickname);
  if (userByEmail) {
    return res.status(400).send("User with this email already exists");
  }
  if (userByNickname) {
    return res.status(400).send("User with this nickname already exists");
  }
  next();
}

function hashPwd(req, res, next) {
  const saltRounds = 5;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(400).send("Error hashing password");
    } else {
      req.body.pass = hash;
      next();
    }
  });
}

module.exports = {
  passwordMatch,
  isNewUser,
  hashPwd,
};
