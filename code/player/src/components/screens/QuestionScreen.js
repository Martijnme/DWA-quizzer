import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentQuestion } from '../../redux/actions/getData';
import { Link } from 'react-router-dom';
import { submitAnswer } from '../../redux/actions/postData';
import { setWaitingMessage } from '../../redux/actions/action';
import { useHistory } from "react-router";

const QuestionScreen = (props) => {
  const [answer, setAnswer] = useState("");
  const [warning, setWarning] = useState("");
  const history = useHistory();

  useEffect(() => {
    props.getCurrentQuestion();
  }, [])

  function submit() {
    if (answer !== "") {
      props.submitAnswer(answer);
      props.setWaitingMessage("Waiting for the next question")
      history.push("/waiting");
    }
    else {
      setWarning("Please provide an answer");
    }
  }

  return (
    <div className='Question'>
      <h2>Question:</h2>
      <h3>{props.question.question}</h3>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} type="text" required="true" placeholder='type your answer here' />

      <button className="btn btn-primary btn-center" onClick={submit}>Submit</button>
      <p>{warning}</p>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    question: state.game.currentQuestion
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCurrentQuestion: getCurrentQuestion,
    submitAnswer: submitAnswer,
    setWaitingMessage: setWaitingMessage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);

