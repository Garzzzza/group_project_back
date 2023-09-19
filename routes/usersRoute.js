const express = require("express");
const router = express.Router();
const { signUpModel } = require("../models/usersModel");
const {
  passwordMatch,
  isNewUser,
  hashPwd,
} = require("../middlewares/middlewares");

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

module.exports = router;
