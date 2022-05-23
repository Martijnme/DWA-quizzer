"use strict";

const mongoose = require("mongoose");
require("../model/Question");
require("../model/Game");

const express = require("express");
const questionsRoute = express.Router();

const Question = mongoose.model("Question");
const Game = mongoose.model("Game");

// get all questions
questionsRoute.get("/", (req, res) => {
  Question.find({}).then((questions) => {
    res.json(questions);
  });
});

//get all categories
questionsRoute.get("/categories", (req, res) => {
  Question.find({}).then((categories) => {
    let cats = [];
    categories.forEach((elm) => {
      if (!cats.includes(elm.category)) cats.push(elm.category);
    });
    res.json(cats);
  });
});

// get current question
questionsRoute.get("/currentquestion/:gameid", (req, res) => {
  Game.findOne({ _id: req.params.gameid }).then((game) => {
    if (game) res.json(game.current.question);
    else res.sendStatus(404);
  });
});

// get 6 questions per category
questionsRoute.post("/:gameid/questions", (req, res) => {
  Game.findOne({ $and: [{ _id: req.params.gameid }] }).then((game) => {
    const questions = game.questions;
    const filteredQuestions = questions.filter((question) => {
      return question.category == req.body.category;
    });
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    res.json(selected);
  });
});

// changes the current question
questionsRoute.post("/currentquestion", (req, res) => {
  let questionObj = {};
  Question.findOne({ question: req.body.question })
    .then((question) => {
      questionObj = question;
    })
    .then(() => {
      Game.findOne({ _id: req.body.roomid }).then((game) => {
        game.current.question = questionObj;
        game.save();
        res.json(game.current.question);
      });
    });
});

// set category
questionsRoute.post("/:gameid/categories", (req, res) => {
  Game.findOne({ _id: req.params.gameid }).then((game) => {
    let changed = false;
    if (game.current.category && game.current.category.length > 0) {
      game.current.category.forEach((elm) => {
        if (elm.choice == req.body.category.choice) {
          changed = true;
          elm.value = req.body.category.value;
        }
      });
      if (!changed) {
        game.current.category.push(req.body.category);
      }
    } else {
      game.current.category.push(req.body.category);
    }

    game.save();
    let cats = [];
    game.current.category.forEach((elm) => {
      cats.push(elm.value);
    });
    res.json(cats);
  });
});
module.exports = questionsRoute;
