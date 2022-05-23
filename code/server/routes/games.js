const express = require("express");
const gamesRoute = express.Router();
const mongoose = require("mongoose");
const questionArray = require("../seeding/questions.json");

require("../model/Game");

const Game = mongoose.model("Game");

// get methods
gamesRoute.get("/:gameid", (req, res) => {
  Game.findOne({ _id: req.params.gameid }).then((game) => {
    if (game === null) {
      res.sendStatus(404);
    }
    else {
      game.team && game.team.length > 0 ? res.json(game.team) : res.json([]);
    }
  });
});

// add a new game
gamesRoute.post("/:masterName", (req, res) => {
  const id = Math.random().toString(36).slice(7);
  Game.insertMany({
    _id: id,
    master: req.params.masterName,
    questions: questionArray,
  })
    .then(() => {
      res.json(id);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

// get current round
gamesRoute.get("/:gameid/rounds", (req, res) => {
  Game.findOne({ _id: req.params.gameid }).then(game => {
    if (game === null) {
      res.sendStatus(404);
    }
    else {
      res.json(game.rounds);
    }
  })
})

module.exports = gamesRoute;