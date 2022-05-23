const questions = require("./questions.json");

const games = [
  {
    _id: "H3BPQ8",
    master: "Tim",
    team: [
      { players: "The bulldogs", score: 0 },
      { players: "The redSocks", score: 0 },
      { players: "The LA-Raiders", score: 0 },
      { players: "The NY Yankees", score: 0 },
    ],
    questions: questions,
    current: {
      question: {
        question: "Who wrote Twilight series of novels?",
        answer: "Stephenie Meyer",
        category: "Art and Literature",
      },
      category: [],
    },
    rounds: [
      {
        answer: {
          teamName: "The bulldogs",
          answer: "test Answer",
          correct: false,
        },
        round: 1,
      },
      {
        answer: {
          teamName: "The bulldogs",
          answer: "test Answer 2",
          correct: false,
        },
        round: 2,
      },
    ],
  },
  {
    _id: "A4B21C3",
    master: "Martijn",
    team: [
      { players: "Tim-mermannen", score: 0 },
      { players: "fightNation", score: 0 },
      { players: "Team Yellow is the new mellow", score: 0 },
      { players: "orange is the new gray", score: 0 },
    ],
    questions: questions,
    current: {
      question: {
        question: "What is Miss Piggy's Surname?",
        answer: "Lee",
        category: "Film and TV",
      },
      category: [
        {
          choice: 1,
          value: "Film and TV",
        },
        {
          choice: 2,
          value: "tv",
        },
        {
          choice: 3,
          value: "sport",
        },
      ],
    },
    rounds: [{ answer: {}, round: 1 }],
  },
];

module.exports = games;
