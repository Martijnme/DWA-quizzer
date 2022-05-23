import QuestionField from "../QuestionField";
import Result from "../Result";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getPlayerAnswers,
  loadCurrentQuestion,
  loadTeams,
  getRoundInfo,
} from "../../redux/actions/getData";

const StartScreen = (props) => {
  useEffect(() => {
    props.loadCurrentQuestion();
    props.getPlayerAnswers();
    props.loadTeams();
    props.getRoundInfo();
  }, []);

  return (
    <div className="wrapper">
      <div className="gameCard">
        <div className="gameID-wrapper gameID-wrapper-right">
          <p>
            Question : {props.questionNumber}/12
            <br />
            Round: {props.roundNumber}
          </p>
          <div className="button__horizontal"></div>
          <div className="button__vertical"></div>
        </div>
        <div className="gameID-wrapper">
          <p>
            Game pin : <span> {props.gameId} </span>
          </p>
          <div className="button__horizontal"></div>
          <div className="button__vertical"></div>
        </div>
      </div>
      <Field gameEnded={props.gameEnded} />
    </div>
  );
};

const Field = (props) => {
  let field;

  if (props.gameEnded) {
    field = <Result />;
  } else {
    field = <QuestionField />;
  }

  return <div className="field">{field}</div>;
};

function mapStateToProps(state) {
  return {
    gameId: state.game.gameId,
    gameEnded: state.game.gameEnded,
    roundNumber: state.game.roundNumber,
    questionNumber: state.game.questionNumber,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadCurrentQuestion: loadCurrentQuestion,
      loadTeams: loadTeams,
      getPlayerAnswers: getPlayerAnswers,
      getRoundInfo: getRoundInfo,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
