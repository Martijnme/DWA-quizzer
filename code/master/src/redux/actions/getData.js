import {
  allTeams,
  allCategories,
  questionsSelected,
  getAnswers,
  currentanswer,
} from "./action";
const serverUrl = "http://localhost:3000";

export function getAllTeams() {
  return (dispatch) => {
    fetch(`${serverUrl}/games/${localStorage.gameId}`)
      .then((response) => response.json())
      .then((data) => {
        let teams = [];
        data.forEach((element) => {
          teams.push(element.players);
        });
        dispatch(allTeams(teams));
      });
  };
}

export function getCategories() {
  return (dispatch) => {
    fetch(`${serverUrl}/questions/categories`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(allCategories(data));
      });
  };
}

export function getQuestions(category) {
  return (dispatch) => {
    fetch(`${serverUrl}/questions/${localStorage.gameId}/questions`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ category: category }),
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        let questions = [];
        data.forEach((elm) => {
          questions.push(elm.question);
        });
        dispatch(questionsSelected(questions));
      });
  };
}

export function getPlayerAnswer() {
  return (dispatch) => {
    fetch(`${serverUrl}/teams/${localStorage.gameId}/answers`)
      .then((reponse) => reponse.json())
      .then((data) => {
        dispatch(getAnswers(data));
      })
      .catch(() => {
        dispatch(getAnswers({}));
      });
  };
}

export function getCurrentQuestion() {
  return (dispatch) => {
    fetch(`${serverUrl}/questions/currentquestion/${localStorage.gameId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(currentanswer(data.answer));
      });
  };
}
