const data = require("./questions.json");
const dataGame = require("./games.js");

const mongoose = require("mongoose");
require("../model/Question");
require("../model/Game");
const dbName = "quizzer";

const db = mongoose.connection;
const Question = mongoose.model("Question");
const Game = mongoose.model("Game");

mongoose
  .connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })
  .then(() => {
    return seedQuestion();
  })
  .then(() => {
    return seedGame();
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    console.log("seeding completed!");
    db.close();
  });

async function seedQuestion() {
  await Question.deleteMany();
  await Question.insertMany(data);
}
async function seedGame() {
  await Game.deleteMany();
  await Game.insertMany(dataGame);
}
