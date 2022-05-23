import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterGame } from "../../redux/actions/postData";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setWaitingMessage } from '../../redux/actions/action';
import { useHistory } from "react-router";

const StartScreen = (props) => {
  const [gameId, setGameId] = useState("");
  const [teamName, setTeamName] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (props.enteredGame) {
      history.push("/waiting");
    }
  }, [props.enteredGame])

  function submit() {
    props.enterGame(gameId, teamName);
    setWaitingMessage("Waiting to start the quiz");
  }

  return (
    <div className="StartScreen TeamList">
      <h2>Room key</h2>
      <input value={gameId} onChange={(e) => setGameId(e.target.value)} className="playerInput" type="text" required="true" placeholder='Room key' />

      <h2>Team name</h2>
      <input value={teamName} onChange={(e) => setTeamName(e.target.value)} className='playerInput' type="text" required="true" placeholder='Team name' />

      <button className="btn btn-primary btn-center" onClick={submit}>Enter game</button>
      <p>{props.warning}</p>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    warning: state.game.warning,
    enteredGame: state.game.enteredGame
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enterGame: enterGame,
    setWaitingMessage: setWaitingMessage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);