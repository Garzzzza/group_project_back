const express = require("express");
const router = express.Router();
const { signUpModel, getUserByIdModel } = require("../models/usersModel");
const {
  passwordMatch,
  isNewUser,
  hashPwd,
  isExistingUser,
  comparePass,
  auth,
} = require("../middlewares/middlewares");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/", isNewUser, passwordMatch, hashPwd, async (req, res) => {
  try {
    await signUpModel(req.body);
    res.status(200).send("User added");
    console.log("User added");
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Internal server error");
  }
});

router.post(
  "/login",
  isExistingUser,
  comparePass,
  async (request, response) => {
    try {
      const token = jwt.sign(
        { id: request.body.user._id },
        process.env.TOKEN_KEY,
        { expiresIn: "20h" }
      );
      response.send({ token: token });
    } catch (error) {
      console.log(error);
      response.status(500).send(error.message);
    }
  }
);

router.get("/loggeduser", auth, async (req, res) => {
  try {
    const user = await getUserByIdModel(req.body._id);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
