const { getAllTeams, getPlayerAnswer } = require("../redux/actions/getData");

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

  function sendMessage(message, name, gameId, target) {
    const theMessage = {
      teamName: name,
      gameId: gameId,
      message: message,
      target: target
    }

    const jsonStr = JSON.stringify(theMessage);
    wsConnection.send(jsonStr);
  }

  return {
    openConnection: openConnection,
    sendMessage: sendMessage,
  };
};

function handleMessage(message) {
  message = message.toString();

  console.log("message: " + message);

  switch (message) {
    case "new team":
      store.dispatch(getAllTeams());
      break;
    case "answer given":
      store.dispatch(getPlayerAnswer())
    default:
      console.log("did not understand the message");
  }
}

module.exports = websocket;
