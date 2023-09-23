const express = require("express");
const router = express.Router();
require("dotenv").config();
const { auth } = require("../middlewares/middlewares");
const {
  newScoreModel,
  getAllScoresModel,
  getLoggedUserScoresModel,
} = require("../models/scoresModel");

router.post("/", auth, async (request, response) => {
  try {
    await newScoreModel(request.body);
    response.status(200).send("Score added successfully");
    console.log("Score added successfully");
  } catch (error) {
    console.error("Error adding score:", error);
    response.status(500).send("Internal server error");
  }
});

router.get("/", auth, async (request, response) => {
  try {
    const scores = await getAllScoresModel();
    response.status(200).send(scores);
    console.log("Scores got successfully");
  } catch (error) {
    console.error("Error getting scores:", error);
    response.status(500).send("Internal server error");
  }
});

router.get("/", auth, async (request, response) => {
  try {
    const scores = await getLoggedUserScoresModel(request.body._id);
    response.status(200).send(scores);
    console.log("Scores got successfully");
  } catch (error) {
    console.error("Error getting scores:", error);
    response.status(500).send("Internal server error");
  }
});

module.exports = router;
