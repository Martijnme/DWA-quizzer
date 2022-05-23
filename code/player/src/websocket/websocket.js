const {
  setWaitingMessage,
  setShowWaitingScreen,
} = require("../redux/actions/action");
const { removeFromGame, gameStopped } = require("../redux/actions/removeTeam");

let wsConnection;
let store;

const websocket = () => {
  function openConnection(theStore) {
    store = theStore;
    wsConnection = new WebSocket("ws://localhost:3000");

    wsConnection.onmessage = function (eventInfo) {
      handleMessage(JSON.parse(eventInfo.data));
    };
    if (localStorage.teamName && localStorage.gameId) {
      wsConnection.onopen = function () {
        sendMessage("reconTeam", localStorage.teamName, localStorage.gameId);
      };
    }
  }

  function sendMessage(message, teamName, gameId) {
    const theMessage = {
      teamName: teamName,
      gameId: gameId,
      message: message,
    };

    const jsonStr = JSON.stringify(theMessage);
    wsConnection.send(jsonStr);
  }

  return {
    openConnection: openConnection,
    sendMessage: sendMessage,
  };
};

function handleMessage(message) {
  switch (message) {
    case "game started":
      store.dispatch(
        setWaitingMessage("Waiting for the quizmaster to start a question...")
      );
      break;
    case "new question selected":
      store.dispatch(setShowWaitingScreen(true));
      break;
    case "team deleted":
      store.dispatch(removeFromGame());
      break;
    case "game stopped":
      store.dispatch(gameStopped());
      break;
    default:
      console.log("did not understand the ws message");
  }
}

module.exports = websocket;
