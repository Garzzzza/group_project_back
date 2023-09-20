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

async function isExistingUser(req, res, next) {
  const userByEmail = await getUserByEmailModel(req.body.email);
  if (userByEmail) {
    req.body.user = userByEmail;
    next();
  } else {
    res.status(400).send("User with this email does not exist");
  }
}

async function comparePass(request, response, next) {
  try {
    bcrypt.compare(
      request.body.password,
      request.body.user.password,
      (err, result) => {
        if (!result) {
          return response.status(401).send("Incorrect password");
        }
        if (err) {
          return response.status(500).send("Error comparing");
        }
        if (result) {
          next();
        }
      }
    );
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message);
  }
}

module.exports = {
  passwordMatch,
  isNewUser,
  hashPwd,
  isExistingUser,
  comparePass,
};
