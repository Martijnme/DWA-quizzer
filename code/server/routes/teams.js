const express = require("express");
const teamsRoute = express.Router();
const mongoose = require("mongoose");

require("../model/Game");
require("../model/Question");

const Game = mongoose.model("Game");

//get methods
// get all team answers
teamsRoute.get("/answers", (req, res) => {
  Game.findOne({ _id: req.body.gameid }).then((game) => {
    res.json(game.rounds);
  });
});

// get answer per round
teamsRoute.get("/:gameid/answers", (req, res) => {
  Game.findOne({ _id: req.params.gameid }).then((game) => {
    game.rounds.forEach((element) => {
      if (element.round == game.rounds.length) {
        if (
          element.answer &&
          Object.keys(element.answer).length != 0 &&
          Object.getPrototypeOf(element.answer) !== Object.prototype
        )
          res.json(element.answer);
        else {
          res.sendStatus(404);
        }
      }
    });
  });
});
//post methods

// answer submitted
teamsRoute.post("/:gameid/answers", (req, res) => {
  console.log("posting new answer");
  Game.findOne({ _id: req.params.gameid }).then((game) => {
    if (game.rounds.length === 0) {
      game.rounds.push({ round: 1 });
    }
    for (let i = 0; i < game.rounds.length; i++) {
      if (game.rounds[i].round == game.rounds.length) {
        let found = false;
        game.rounds[i].answer.forEach((t) => {
          if (t.teamName == req.body.teamName) {
            t.answer = req.body.answer;
            found = true;
          }
        });

        if (!found) {
          game.rounds[i].answer.push({
            teamName: req.body.teamName,
            answer: req.body.answer,
            correct: false,
          });
        }
      }
    }
    game.save();
    res.json(`Answer '${req.body.answer}' submitted`);
  });
});

// answer edit (right/wrong)
teamsRoute.put("/:gameid/answersedit", (req, res) => {
  let gameObj = {};
  Game.findOne({
    _id: req.params.gameid,
  })
    .then((game) => {
      for (let i = 0; i < game.rounds.length; i++) {
        for (let j = 0; j < game.rounds[i].answer.length; j++) {
          if (
            game.rounds[i].round == game.rounds.length &&
            game.rounds[i].answer[j].teamName == req.body.teamName
          ) {
            game.rounds[i].answer[j].correct = req.body.answerValue;
          }
        }
      }
      game.save();
      gameObj = game;
    })
    .then(() => {
      res.json(gameObj.rounds[gameObj.rounds.length - 1].answer);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

// team joins a game
teamsRoute.post("/:gameid", (req, res) => {
  Game.findOne({ _id: req.params.gameid }).then((game) => {
    if (game === null) {
      res.sendStatus(404);
    }
    found = false;
    game.team.forEach((elm) => {
      if (elm.players == req.body.teamName) {
        found = true;
      }
    });
    if (found) {
      res.sendStatus(409);
    } else {
      Game.updateOne(
        {
          _id: req.params.gameid,
        },
        {
          $push: {
            team: {
              players: req.body.teamName,
              score: 0,
            },
          },
        }
      ).then(() => {
        res.sendStatus(201);
      });
    }
  });
});

// team remove from game
teamsRoute.delete("/:gameid", (req, res) => {
  Game.findOne({ _id: req.params.gameid }).then((game) => {
    game.team.forEach((elm) => {
      if (elm.players === req.body.teamName)
        game.team.splice(game.team.indexOf(elm), 1);
    });
    game.save();
    res.json(game.team);
  });
});

teamsRoute.put("/:gameid/teamscore", (req, res) => {
  Game.findOne({ _id: req.params.gameid }).then((game) => {
    const teams = game.team;
    req.body.scores.forEach((elm) => {
      if (elm.correct) {
        teams.forEach((t) => {
          if (t.players == elm.teamName) {
            t.score++;
          }
        });
      }
    });
    if (game.rounds && game.rounds.length % 12 === 0) {
      let places = [];
      teams.forEach((elm) => {
        let teamName = elm.players;
        let score = elm.score;
        places.push({ teamName, score });
      });
      places.sort((a, b) => b.score - a.score);
      for (let i = 0; i < places.length; i++) {
        let points = 0.1;
        switch (i) {
          case 0:
            points = 4;
            break;
          case 1:
            points = 2;
            break;
          case 2:
            points = 1;
            break;
          default:
            points = 0.1;
            break;
        }
        teams.forEach((elm) => {
          if (elm.players === places[i].teamName) {
            elm.score = elm.score + points;
          }
        });
      }
    }
    console.log(teams);
    game.rounds.push({ answer: [], round: game.rounds.length + 1 });
    game.save();
    res.json(game.rounds.length);
  });
});
module.exports = teamsRoute;
