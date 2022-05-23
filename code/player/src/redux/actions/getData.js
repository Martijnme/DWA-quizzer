import { setCurrentQuestion } from "./action";

const serverUrl = "http://localhost:3000";

export function getCurrentQuestion() {
  return (dispatch) => {
    fetch(`${serverUrl}/questions/currentquestion/${localStorage.gameId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCurrentQuestion(data));
      });
  };
}
