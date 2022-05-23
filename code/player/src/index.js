import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./components/App"
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/reducers/rootreducer';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import websocket from "./websocket/websocket";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

let ws = websocket();
ws.openConnection(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
