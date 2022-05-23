import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useState } from "react";
import { createGame } from "../../redux/actions/postData";
import { useHistory } from "react-router";

const StartScreen = (props) => {
  const [name, setName] = useState("");
  const history = useHistory();

  function createGame() {
    if (name === "") return alert("enter a name before creating a room");
    localStorage.clear();
    props.createGame(name);
    setTimeout(() => history.push("/selectteams"), 500);
  }
  
  return (
    <div className="startScreen">
      <div>
        <h3>Your name:</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
      </div>
      <div>
        <button onClick={createGame} className="btn btn-primary btn-center">
          create room
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    item: state.game.item,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createGame: createGame,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
