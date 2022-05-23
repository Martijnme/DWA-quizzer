import websocket from "././../../websocket/websocket.js";
let ws = websocket();

const initialState = {
  item: [],
  teams: [],
  gameId: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "CREATED_GAME":
      localStorage.gameId = action.id;
      ws.sendMessage("hello", "master", action.id);
      return {
        ...state,
        gameId: action.id,
      };
    case "GET_TEAMS":
    case "DELETE_TEAM":
      ws.sendMessage("team deleted", "master", state.gameId, action.teamName);
      return {
        ...state,
        teams: action.teams,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        selectedcategory: action.category,
      };
    case "SELECTED_QUESTIONS":
      return {
        ...state,
        questions: action.questions,
      };
    case "SET_CURRENT_QUESTION":
      localStorage.currentQuestion = JSON.stringify(action.currentquestion);
      ws.sendMessage("new question selected", "master", state.gameId);
      return { ...state };
    case "GET_ANSWERS":
      return {
        ...state,
        answers: action.answers,
      };
    case "START_GAME":
      ws.sendMessage("game started", "master", state.gameId);
      return {
        ...state,
      };
    case "STOP_GAME":
      ws.sendMessage("game stopped", "master", state.gameId);
      return {
        ...state,
      };
    case "GET_CURRENT":
      return {
        ...state,
        answercurrent: action.answer,
      };
    case "SET_SCORES":
      return {
        ...state,
      };
    case "SET_ROUNDNUMBER":
      ws.sendMessage("question ended", "master", state.gameId);
      return {
        ...state,
        roundNumber: action.round,
      };

    default:
      return state;
  }
}

export default reducer;
