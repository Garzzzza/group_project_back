const mongoose = require("mongoose");

const scoreGameSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Will set to current date and time by default
  },
});
const scoreKGame = mongoose.model("ScoreKGame", scoreGameSchema, "ScoreKGame");
const scoreIGame = mongoose.model("ScoreIGame", scoreGameSchema, "ScoreIGame");

const newScoreModel = async (scoreData) => {
  try {
    let gameModel;
    if (scoreData.game === "kgame") {
      gameModel = scoreKGame;
    } else if (scoreData.game === "igame") {
      gameModel = scoreIGame;
    }

    const score = new gameModel({
      userId: scoreData._id,
      score: scoreData.score,
      date: Date.now(),
    });

    await score.save();
    return score;
  } catch (error) {
    console.error("Error getting all scores:", error);
    throw error;
  }
};

const getAllScoresModel = async (scoreData) => {
  try {
    let gameModel;
    if (scoreData.game === "kgame") {
      gameModel = scoreKGame;
    } else if (scoreData.game === "igame") {
      gameModel = scoreIGame;
    }
    const scores = await gameModel.find();
    return scores;
  } catch (error) {
    console.error("Error getting all scores:", error);
    throw error;
  }
};

const getLoggedUserScoresModel = async (scoreData) => {
  try {
    let gameModel;
    if (scoreData.game === "kgame") {
      gameModel = scoreKGame;
    } else if (scoreData.game === "igame") {
      gameModel = scoreIGame;
    }
    const scores = await gameModel.find({ userId: scoreData._id });
    return scores;
  } catch (error) {
    console.error("Error getting all scores:", error);
  }
};

module.exports = {
  scoreIGame,
  scoreKGame,
  newScoreModel,
  getAllScoresModel,
  getLoggedUserScoresModel,
};
