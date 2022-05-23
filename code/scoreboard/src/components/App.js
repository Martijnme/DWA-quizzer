import StartScreen from "./screen/StartScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EnterGameScreen from "./screen/EnterGameScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <EnterGameScreen />
          </Route>
          <Route path="/game">
            <StartScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
