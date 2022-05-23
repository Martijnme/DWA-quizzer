const { gameEnded, questionStarted, questionEnded } = require("../redux/actions/action");
const { loadCurrentQuestion, loadTeams, getPlayerAnswers, getRoundInfo } = require("../redux/actions/getData");

let wsConnection;
let store;

const websocket = () => {

    function openConnection(theStore) {
        store = theStore;
        wsConnection = new WebSocket("ws://localhost:3000");

        wsConnection.onmessage = function (eventInfo) {
            handleMessage(JSON.parse(eventInfo.data));
        };
    }

    function sendMessage(message, teamName, gameId) {
        const theMessage = {
            teamName: teamName,
            gameId: gameId,
            message: message
        }

        const jsonStr = JSON.stringify(theMessage);
        wsConnection.send(jsonStr);
    }

    return {
        openConnection: openConnection,
        sendMessage: sendMessage
    }
}

function handleMessage(message) {
    switch (message) {
        case "new question selected":
            store.dispatch(loadCurrentQuestion());
            store.dispatch(loadTeams());
            store.dispatch(getPlayerAnswers());
            store.dispatch(questionStarted());
            store.dispatch(getRoundInfo());
            break;
        case "new team":
            store.dispatch(loadTeams());
        case "answer given":
            store.dispatch(getPlayerAnswers());
        case "team deleted":
            store.dispatch(loadTeams());
            break;
        case "game stopped":
            store.dispatch(loadTeams());
            store.dispatch(gameEnded());
            break;
        case "question ended":
            console.log("end!");
            store.dispatch(loadTeams());
            store.dispatch(questionEnded());
            break;
        default:
            console.log("did not understand: " + message);
    }
}

module.exports = websocket;
