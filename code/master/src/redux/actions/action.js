import {
  CREATED_GAME,
  GET_TEAMS,
  DELETE_TEAM,
  GET_CATEGORIES,
  SET_CATEGORY,
  SELECTED_QUESTIONS,
  SET_CURRENT_QUESTION,
  GET_ANSWERS,
  START_GAME,
  STOP_GAME,
  GET_CURRENT,
  SET_SCORES,
  SET_ROUNDNUMBER,
} from "./actionType.js";

export function createdGame(id) {
  return {
    type: CREATED_GAME,
    id,
  };
}

export function allTeams(teams) {
  return {
    type: GET_TEAMS,
    teams,
  };
}

export function removeTeamFromList(teams, teamName) {
  return {
    type: DELETE_TEAM,
    teams,
    teamName,
  };
}

export function allCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories,
  };
}

export function CategorySet(category) {
  return {
    type: SET_CATEGORY,
    category,
  };
}

export function questionsSelected(questions) {
  return {
    type: SELECTED_QUESTIONS,
    questions,
  };
}

export function currentQuestion(currentquestion) {
  return {
    type: SET_CURRENT_QUESTION,
    currentquestion,
  };
}

export function getAnswers(answers) {
  return {
    type: GET_ANSWERS,
    answers,
  };
}

export function answersEdited(answers) {
  return {
    type: GET_ANSWERS,
    answers,
  };
}

export function startGame() {
  return {
    type: START_GAME,
  };
}

export function stopGame() {
  return {
    type: STOP_GAME,
  };
}

export function currentanswer(answer) {
  return {
    type: GET_CURRENT,
    answer,
  };
}

export function setScore() {
  return {
    type: SET_SCORES,
  };
}

export function setRoundNumber(round) {
  return {
    type: SET_ROUNDNUMBER,
    round,
  };
}
