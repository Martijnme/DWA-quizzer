import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import { setCurrentQuestion } from "../redux/actions/postData";
import { connect } from "react-redux";
import { setPlayerScores } from "../redux/actions/postData";
import { Link } from "react-router-dom";
import { stopGame } from "../redux/actions/action";

const GameButton = (props) => {
  const history = useHistory();

  const clearForStop = () => {
    localStorage.clear();
    props.stopGame();
  };

  const backEvent = () => {
    switch (props.prev) {
      case "category":
        if (props.selection() && props.selection().length === 3) {
          localStorage.categories = JSON.stringify(props.selection());
          history.push(`${props.routeNext}`);
        } else
          alert(
            `select 3 categories of questions, ${3 - props.selection().length
            } more to select`
          );
        break;
      case "question":
        if (props.currentQuestion) {
          props.setCurrentQuestion(props.currentQuestion);
          history.push(`${props.routeNext}`);
        } else {
          alert(`select a question to continue`);
        }
        break;
      case "answer":
        if (props.scores !== undefined) {
          if (JSON.parse(localStorage.teams).length !== props.scores.length) {
            alert(
              JSON.parse(localStorage.teams).length -
              props.scores.length +
              "  team(s) still need to submit their answer"
            );
          } else {
            if (props.roundNumber && props.roundNumber % 12 == 0) {
              props.setPlayerScores(props.scores);
              history.push(`/categorypicker`);
            } else {
              props.setPlayerScores(props.scores);
              history.push(`${props.routeNext}`);
            }
          }
        }
        break;
    }
  };

  return (
    <div className="gamebuttons">
      <Link to={props.routeBack}>
        <button className="btn btn-primary" onClick={clearForStop}>
          STOP
        </button>
      </Link>
      <button onClick={backEvent} className="btn btn-primary">
        Next
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    roundNumber: state.game.roundNumber,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setCurrentQuestion: setCurrentQuestion,
      stopGame: stopGame,
      setPlayerScores: setPlayerScores,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GameButton);
