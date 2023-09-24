const express = require("express");
const router = express.Router();
require("dotenv").config();
const { auth } = require("../middlewares/middlewares");
const { getSolutionsModel } = require("../models/kGameModel");

router.get("/", auth, async (request, response) => {
  try {
    const solutions = await getSolutionsModel();
    response.status(200).send(solutions);
  } catch (error) {
    console.error("Error getting solutions:", error);
    response.status(500).send("Internal server error");
  }
});

module.exports = router;
