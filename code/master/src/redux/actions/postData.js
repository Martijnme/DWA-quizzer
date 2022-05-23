import {
  createdGame,
  removeTeamFromList,
  CategorySet,
  currentQuestion,
  answersEdited,
  setRoundNumber,
} from "./action";

const serverUrl = "http://localhost:3000";

export function createGame(masterName) {
  return (dispatch) => {
    fetch(`${serverUrl}/games/${masterName}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(createdGame(data));
      });
  };
}

export function removeTeam(teamName) {
  return (dispatch) => {
    fetch(`${serverUrl}/teams/${localStorage.gameId}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify({ teamName: teamName }),
    })
      .then((response) => response.json())
      .then((data) => {
        let teams = [];
        data.forEach((elm) => {
          teams.push(elm.players);
        });
        dispatch(removeTeamFromList(teams, teamName));
      });
  };
}

export function setCategory(category) {
  return (dispatch) => {
    fetch(`${serverUrl}/questions/${localStorage.gameId}/categories`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ category: category }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(CategorySet(data));
      });
  };
}

export function setCurrentQuestion(question) {
  return (dispatch) => {
    fetch(`${serverUrl}/questions/currentquestion`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ question: question, roomid: localStorage.gameId }),
    })
      .then((reponse) => reponse.json())
      .then((data) => dispatch(currentQuestion(data)));
  };
}

export function setPlayerAnswerValue(answer, teamName) {
  return (dispatch) => {
    fetch(`${serverUrl}/teams/${localStorage.gameId}/answersedit`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({ teamName: teamName, answerValue: answer }),
    })
      .then((reponse) => reponse.json())
      .then((data) => dispatch(answersEdited(data)));
  };
}

export function setPlayerScores(playerScore) {
  return (dispatch) => {
    fetch(`${serverUrl}/teams/${localStorage.gameId}/teamscore`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({ scores: playerScore }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setRoundNumber(data));
      });
  };
}
