import {
  ENTER_GAME_SUCCESS,
  SET_WAITING_MESSAGE,
  SET_CURRENT_QUESTION,
  SET_SHOWWAITINGSCREEN,
  ENTER_GAME_FAILED,
  SUBMIT_ANSWER_SUCCESS,
  GAME_HAS_STOPPED,
} from "./actionType.js";

export function enterGameSuccess(gameId, teamName) {
  return {
    type: ENTER_GAME_SUCCESS,
    gameId,
    teamName,
    enteredGame: true,
  };
}

export function enterGameFailed(message) {
  return {
    type: ENTER_GAME_FAILED,
    message,
  };
}

export function setWaitingMessage(message) {
  return {
    type: SET_WAITING_MESSAGE,
    message,
  };
}

export function setCurrentQuestion(currentQuestion) {
  return {
    type: SET_CURRENT_QUESTION,
    currentQuestion,
  };
}

export function setShowWaitingScreen(bool) {
  return {
    type: SET_SHOWWAITINGSCREEN,
    bool,
  };
}

export function removedFromGame() { }

export function submitAnswerSuccess() {
  return {
    type: SUBMIT_ANSWER_SUCCESS,
  };
}

export function gameHasStopped() {
  localStorage.clear();
  return {
    type: GAME_HAS_STOPPED,
  };
}
