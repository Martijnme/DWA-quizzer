const mongoose = require("mongoose");
require("./Question");
const { questionSchema: question } = require("./Question");

const gameSchema = new mongoose.Schema({
  _id: String, // Room key
  master: { type: String, required: true }, // Master ID
  team: [{ players: String, score: Number }], // Teams: players, score
  questions: [question],
  current: {
    question: question,
    category: [{ choice: Number, value: String }],
  },
  rounds: [
    {
      answer: [{ teamName: String, answer: String, correct: Boolean }],
      round: Number,
    },
  ],
});

module.exports = mongoose.model("Game", gameSchema);
