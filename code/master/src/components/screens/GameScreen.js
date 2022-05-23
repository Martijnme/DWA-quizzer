import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import GameButton from "../GameButtons";
import { getPlayerAnswer } from "../../redux/actions/getData";
import { setPlayerAnswerValue } from "../../redux/actions/postData";
import { getCurrentQuestion } from "../../redux/actions/getData";
import TeamCard from "../TeamCard";

const GameScreen = (props) => {
  let question = {};
  if (localStorage.currentQuestion && localStorage.currentQuestion.length > 0) {
    question = JSON.parse(localStorage.currentQuestion);
  } else {
    props.getCurrentQuestion();
    question.answer = props.answercurrent;
  }
  const answer = question.answer;
  const [playerAnswer, setPlayerAnswer] = useState({});

  const handleAnswerToggle = (event, teamCardProps) => {
    const index = teamCardProps.playerTeamIndex;
    setPlayerAnswer((prevPlayerAnswer) => {
      const currentCorrect = prevPlayerAnswer[index].correct;
      prevPlayerAnswer[index].correct = !currentCorrect;
      return prevPlayerAnswer;
    });

    switch (playerAnswer[index].correct) {
      case true:
        event.target.classList.remove("wrong");
        event.target.classList.add("correct");
        break;
      case false:
        event.target.classList.remove("correct");
        event.target.classList.add("wrong");
        break;
    }
    props.setPlayerAnswerValue(playerAnswer[index].correct, teamCardProps.team);
  };

  useEffect(() => {
    props.getPlayerAnswer();
    setPlayerAnswer(props.answers);
  }, [props.answer]);

  useEffect(() => {
    props.getCurrentQuestion();
    question.answer = props.answercurrent;
    setPlayerAnswer(props.answers);
  }, [question]);
  return (
    <>
      <div className="gamescreen">
        <h3>Correct Answer:</h3> <span> {answer}</span>
        <table>
          <thead>
            <tr>
              <th>Teams</th>
              <th>Correct</th>
            </tr>
          </thead>
          {playerAnswer && playerAnswer.length > 0 ? (
            <tbody>
              {playerAnswer.map((team, index) => {
                return (
                  <TeamCard
                    playerTeamIndex={index}
                    answer={team.answer}
                    team={team.teamName}
                    correct={team.correct}
                    key={team._id}
                    toggleAnswer={handleAnswerToggle}
                  />
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <th>No answers yet</th>
            </tbody>
          )}
        </table>
        <h5 className="answerdisplay">
          answers submitted :{" "}
          {playerAnswer && playerAnswer.length > 0 ? playerAnswer.length : 0} /{" "}
          {JSON.parse(localStorage.teams).length}
        </h5>
      </div>
      <GameButton
        routeNext="/questionpicker"
        routeBack="/"
        prev="answer"
        scores={playerAnswer}
      />
    </>
  );
};
function mapStateToProps(state) {
  return {
    answers: state.game.answers,
    answercurrent: state.game.answercurrent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPlayerAnswer: getPlayerAnswer,
      setPlayerAnswerValue: setPlayerAnswerValue,
      getCurrentQuestion: getCurrentQuestion,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
