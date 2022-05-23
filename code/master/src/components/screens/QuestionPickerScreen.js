import GameButton from "../GameButtons";
import { useEffect, useState } from "react";
import { getQuestions } from "../../redux/actions/getData";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Question from "../Questions";
const QuestionPickerScreen = (props) => {
  const [questions, setQuestions] = useState([{}]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const categoryselected = JSON.parse(localStorage.categories);

  const fillcurrent = selectedQuestion;
  useEffect(() => {
    props.getQuestions(categoryselected[randomInt(0, 2)]);
    setQuestions(props.questions);
  }, categoryselected);

  useEffect(() => {
    setQuestions(props.questions);
  }, [props.questions]);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const selectQuestion = (e) => {
    const selected = document.querySelectorAll(".selected");
    if (selected.length > 0) {
      selected.forEach((elm) => {
        elm.classList.remove("selected");
      });
    }
    if (e.tagName == "P") {
      e.classList.add("selected");
      setSelectedQuestion(e.textContent);
    } else {
      e.firstChild.classList.add("selected");
      setSelectedQuestion(e.firstChild.textContent);
    }
  };
  return (
    <>
      <div className="picker">
        <h3>Question selector</h3>
        <div className="questionscontainer">
          {questions && questions.length > 0 ? (
            questions.map((question, id) => {
              question = JSON.stringify(question);
              question = question.replace(/['"]+/g, "");
              return (
                <Question
                  question={question}
                  key={id}
                  onSelect={selectQuestion}
                />
              );
            })
          ) : (
            <p> someting went wrong, cant load questions </p>
          )}
        </div>
      </div>
      <GameButton
        routeNext="/game"
        routeBack="/"
        prev="question"
        currentQuestion={fillcurrent}
      />
    </>
  );
};

function mapStateToProps(state) {
  return {
    questions: state.game.questions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getQuestions: getQuestions,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionPickerScreen);
