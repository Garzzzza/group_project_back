require("dotenv").config();
const bcrypt = require("bcrypt");
const {
  getUserByEmailModel,
  getUserByNicknameModel,
} = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

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
  console.log("Password Value:", req.body.password);
  console.log("Password Type:", typeof req.body.password);
  const saltRounds = 5;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(400).send("Error hashing password");
      console.log(err);
    } else {
      req.body.password = hash;
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

function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Authorization headers required");
  }
  const token = req.headers.authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    req.body._id = decoded.id;

    next();
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: cloudStorage });

module.exports = {
  passwordMatch,
  isNewUser,
  hashPwd,
  isExistingUser,
  comparePass,
  auth,
  upload,
};
