import {
  submitAnswerSuccess,
  enterGameFailed,
  enterGameSuccess,
} from "./action";

const serverUrl = "http://localhost:3000";

export function enterGame(gameId, name) {
  return (dispatch) => {
    fetch(`${serverUrl}/teams/${gameId}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ teamName: name }),
    }).then((data) => {
      if (data.status === 201) {
        dispatch(enterGameSuccess(gameId, name));
      }
      if (data.status === 404) {
        dispatch(enterGameFailed("Invalid room key"));
      }
      if (data.status === 409) {
        dispatch(enterGameFailed("this team name is already selected"));
      }
    });
  };
}

export function submitAnswer(answer) {
  return (dispatch, getState) => {
    const state = getState();

    fetch(`${serverUrl}/teams/${localStorage.gameId}/answers`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ teamName: localStorage.teamName, answer: answer }),
    }).then((data) => {
      if (data.status === 200) {
        dispatch(submitAnswerSuccess());
      }
    });
  };
}
