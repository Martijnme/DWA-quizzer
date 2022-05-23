import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { setShowWaitingScreen } from "../../redux/actions/action";
import "../../styles/animations.css";

const WaitingScreen = (props) => {
  let history = useHistory();

  useEffect(() => {
    if (props.showWaitingScreen) history.push("/question");
    props.setShowWaitingScreen(false);
  });

  function submit() {
    history.push("/question");
  }

  return (
    <div>
      <div className="Question-waiting">
        <h3>{props.message}</h3>
        <p className="dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
      </div>
      <BackButton submit={submit} message={props.message} />
    </div>
  );
};

const BackButton = (props) => {
  let returnvalue = "";
  if (props.message === "Waiting for the next question") {
    returnvalue = "Back";
  }

  return (
    <button onClick={props.submit} className="btn btn-primary btn-center">{returnvalue}</button>
  )
}

function mapStateToProps(state) {
  return {
    message: state.game.waitingMessage,
    showWaitingScreen: state.game.showWaitingScreen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setShowWaitingScreen: setShowWaitingScreen,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingScreen);
