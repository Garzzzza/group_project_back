const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to the User model
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

const Score = mongoose.model("Score", scoreSchema);

const newScoreModel = async (scoreData) => {
  const score = new Score({
    userId: scoreData._id,
    nickname: scoreData.nickname,
    score: scoreData.score,
  });
  await score.save();
  return score;
};

const getAllScoresModel = async () => {
  try {
    const scores = await Score.find();
    return scores;
  } catch (error) {
    console.error("Error getting all scores:", error);
  }
};

const getLoggedUserScoresModel = async (userId) => {
  try {
    const scores = await Score.find({ userId: userId });
    return scores;
  } catch (error) {
    console.error("Error getting all scores:", error);
  }
};

module.exports = {
  Score,
  newScoreModel,
  getAllScoresModel,
  getLoggedUserScoresModel,
};
