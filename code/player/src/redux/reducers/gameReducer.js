import websocket from "../../websocket/websocket";
let ws = websocket();

const initialState = {
  waitingMessage: "Waiting...",
  showWaitingScreen: false,
  currentQuestion: "this is a question?",
  enteredGame: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ENTER_GAME_SUCCESS":
      ws.sendMessage("new team", action.teamName, action.gameId);
      localStorage.gameId = action.gameId;
      localStorage.teamName = action.teamName;
      return {
        ...state,
        gameId: action.gameId,
        teamName: action.teamName,
        enteredGame: true,
      };
    case "ENTER_GAME_FAILED":
      return {
        ...state,
        enteredGame: false,
        warning: action.message,
      };
    case "SET_WAITING_MESSAGE":
      return {
        ...state,
        waitingMessage: action.message,
      };
    case "SET_CURRENT_QUESTION":
      // localStorage.currentQuestion = aciton.currentQuestion;
      return {
        ...state,
        currentQuestion: action.currentQuestion,
      };
    case "SET_SHOWWAITINGSCREEN":
      // localStorage.showWaitingScreen = action.bool;
      return {
        ...state,
        showWaitingScreen: action.bool,
      };
    case "SUBMIT_ANSWER_SUCCESS":
      ws.sendMessage(
        "answer given",
        localStorage.teamName,
        localStorage.gameId
      );
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default reducer;