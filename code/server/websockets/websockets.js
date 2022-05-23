const onWSConnection = (websocket, websocketServer) => {
  websocket.onmessage = function (eventInfo) {
    const message = JSON.parse(eventInfo.data);
    setClientInfo(message, websocket);
    handleMessage(message, websocketServer, websocket);
  };
};

function setClientInfo(message, websocket) {
  websocket.name = message.teamName;
  websocket.gameId = message.gameId;
}

function handleMessage(message, websocketServer, websocket) {
  console.log(message);

  switch (message.message) {
    case "new team":
      console.log("a new team has entered");
      sendMessageToMaster(message.gameId, "new team", websocketServer);
      sendMessageToScoreBoard(message.gameId, "new team", websocketServer);
      break;
    case "game started":
      console.log("game has started");
      sendMessageToClients(message.gameId, "game started", websocketServer);
      break;
    case "team deleted":
      console.log("team deleted: " + message.target);
      sendMessageToClient(message.gameId, message.target, "team deleted", websocketServer);
      sendMessageToScoreBoard(message.gameId, "team deleted", websocketServer);
      break;
    case "new question selected":
      console.log("new question selected");
      sendMessageToClients(message.gameId, "new question selected", websocketServer);
      sendMessageToScoreBoard(message.gameId, "new question selected", websocketServer);
      break;
    case "answer given":
      console.log("a new answer has been given");
      sendMessageToMaster(message.gameId, "answer given", websocketServer);
      sendMessageToScoreBoard(message.gameId, "answer given", websocketServer);
      break;
    case "game stopped":
      console.log("game was stopped");
      sendMessageToClients(message.gameId, "game stopped", websocketServer);
      sendMessageToScoreBoard(message.gameId, "game stopped", websocketServer);
      break;
    case "question ended":
      sendMessageToScoreBoard(message.gameId, "question ended", websocketServer);
      break;
    default:
      console.log("Server did receive a ws message that could not be understood");
  }
}

function sendMessageToMaster(gameId, message, websocketServer) {
  websocketServer.clients.forEach(function (client) {
    if (client.name === "master" && client.gameId === gameId) {
      client.send(JSON.stringify(message));
    }
  })
}

function sendMessageToClients(gameId, message, websocketServer) {
  websocketServer.clients.forEach(function (client) {
    if (client.gameId === gameId) {
      client.send(JSON.stringify(message));
    }
  });
}

function sendMessageToClient(gameId, name, message, websocketServer) {
  websocketServer.clients.forEach(function (client) {
    if (client.gameId === gameId && client.name === name) {
      client.send(JSON.stringify(message));
    }
  });
}

function sendMessageToScoreBoard(gameId, message, websocketServer) {
  websocketServer.clients.forEach(function (client) {
    if (client.name === "scoreboard" && client.gameId === gameId) {
      client.send(JSON.stringify(message));
    }
  })
}

module.exports = onWSConnection;
