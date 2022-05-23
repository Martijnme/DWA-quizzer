import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import QuestionPickerScreen from "./screens/QuestionPickerScreen";
import SelectTeamsScreen from "./screens/SelectTeamsScreen";
import CategorySelector from "./screens/CategorySelector";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../styles/screen.css";
import "../styles/form.css";
import "../styles/button.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <StartScreen />
          </Route>
          <Route path="/selectteams">
            <SelectTeamsScreen />
          </Route>
          <Route path="/game">
            <GameScreen />
          </Route>
          <Route path="/questionpicker">
            <QuestionPickerScreen />
          </Route>
          <Route path="/categorypicker">
            <CategorySelector />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
