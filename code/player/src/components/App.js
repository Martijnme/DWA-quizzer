import StartScreen from "./screens/StartScreen";
import TeamList from "./TeamList";
import QuestionScreen from "./screens/QuestionScreen";
import WaitingScreen from "./screens/WaitingScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../styles/screen.css";
import "../styles/button.css";
import "../styles/form.css";
import RemovedScreen from "./screens/RemovedScreen";

import history from "../history/history";
import GameStoppedScreen from "./screens/GameStoppedScreen";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <StartScreen />
          </Route>
          <Route path="/1">
            <TeamList />
          </Route>
          <Route path="/question">
            <QuestionScreen />
          </Route>
          <Route path="/waiting">
            <WaitingScreen />
          </Route>
          <Route path="/removed">
            <RemovedScreen />
          </Route>
          <Route path="/gamestopped">
            <GameStoppedScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
