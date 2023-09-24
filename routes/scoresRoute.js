const express = require("express");
const router = express.Router();
require("dotenv").config();
const { auth } = require("../middlewares/middlewares");
const {
  newScoreModel,
  getAllScoresModel,
  getLoggedUserScoresModel,
} = require("../models/scoresModel");

router.post("/:game", auth, async (request, response) => {
  try {
    request.body.game = request.params.game;
    await newScoreModel(request.body);
    response.status(200).send("Score added successfully");
  } catch (error) {
    console.error("Error adding score:", error);
    response.status(500).send("Internal server error");
  }
});

router.get("/:game", auth, async (request, response) => {
  try {
    request.body.game = request.params.game;

    const scores = await getAllScoresModel(request.body);
    response.status(200).send(scores);
  } catch (error) {
    console.error("Error getting scores:", error);
    response.status(500).send("Internal server error");
  }
});

router.get("/user_score/:game", auth, async (request, response) => {
  try {
    request.body.game = request.params.game;

    const scores = await getLoggedUserScoresModel(request.body);
    response.status(200).send(scores);
  } catch (error) {
    console.error("Error getting scores:", error);
    response.status(500).send("Internal server error");
  }
});

module.exports = router;
