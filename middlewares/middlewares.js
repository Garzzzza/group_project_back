const bcrypt = require("bcrypt");
const { getUserByEmailModel } = require("../models/usersModel");

function passwordMatch(req, res, next) {
  if (req.body.password !== req.body.rePassword) {
    return res.status(400).send("Passwords do not match");
  }
  next();
}

async function isNewUser(req, res, next) {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    return res.status(400).send("User with this email already exists");
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
