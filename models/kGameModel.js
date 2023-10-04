const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const solution = mongoose.model("solution", solutionSchema, "solutions");

const getSolutionsModel = async () => {
  try {
    const solutions = await solution.find();
    return solutions;
  } catch (error) {
    console.error("Error getting solutions:", error);
    throw error;
  }
};

module.exports = {
  solution,
  getSolutionsModel,
};
