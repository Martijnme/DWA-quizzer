import websocket from "../../websocket/websocket";
let ws = websocket();


const initialState = {
    gameId: "",
    teamsWithAnswer: null,
    gameEnded: false,
    questionEnded: false,
    roundNumber: 1,
    questionNumber: 1
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "ENTER_GAME_SUCCESS":
            ws.sendMessage("hello", "scoreboard", action.gameId)
            return {
                ...state,
                gameId: action.gameId,
            };
        case "ENTER_GAME_FAILED":
            return {
                ...state,
                warning: action.message
            }
        case "LOAD_CURRENT_QUESTION_SUCCESS":
            return {
                ...state,
                currentQuestion: action.question.question,
                currentCategory: action.question.category
            }
        case "LOAD_CURRENT_QUESTION_FAILED":
            return {
                ...state,
                currentQuestion: action.message
            }
        case "LOAD_TEAMS_SUCCESS":
            return {
                ...state,
                teams: action.teams
            }
        case "GET_ANSWERS_SUCCESS":
            return {
                ...state,
                teamsWithAnswer: action.teams.map(team => team.teamName),
                answers: action.teams
            }
        case "GET_ANSWERS_FAILED":
            return {
                ...state,
                teamsWithAnswer: null
            }
        case "GAME_ENDED":
            return {
                ...state,
                gameEnded: true
            }
        case "QUESTION_ENDED":
            return {
                ...state,
                questionEnded: true,
                currentQuestion: "Waiting for new question...",
                currentCategory: ""
            }
        case "QUESTION_STARTED":
            return {
                ...state,
                questionEnded: false
            }
        case "LOAD_ROUND_INFO_SUCCESS":
            return {
                ...state,
                roundNumber: action.roundNumber,
                questionNumber: action.questionNumber
            }
        default:
            return state;
    }
}

export default reducer;
