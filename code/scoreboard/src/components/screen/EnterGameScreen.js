import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { enterGame } from "../../redux/actions/getData";

const EnterGameScreen = (props) => {
  const [gameId, setGameId] = useState("");
  const [warning, setWarning] = useState(props.warning);
  const history = useHistory();

  useEffect(() => {
    if (props.gameId !== "") {
      history.push("/game");
    }
  }, [props.gameId]);

  useEffect(() => {
    setWarning(props.warning);
  }, [props.warning]);

  function submit() {
    if (gameId === "") {
      setWarning("You must provide a room id");
    } else {
      props.enterGame(gameId);
    }
  }

  return (
    <div className="wrapper">
      <div className="field-wrapper">
        <div className="enterKey">
          <h2>Enter Room Key </h2>
          <input
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="playerInput"
            type="text"
            required="true"
            placeholder="Room key"
          />
          <p>{warning ? warning : `  `}</p>
          <button onClick={submit} className="btn btn-primary btn-center">
            Enter Game
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    gameId: state.game.gameId,
    warning: state.game.warning,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enterGame: enterGame,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterGameScreen);
