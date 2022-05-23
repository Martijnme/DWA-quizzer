import Pillar from "./Pillar";
import "../styles/confetti.css";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useEffect, useState } from "react";

const Result = (props) => {
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();

  useEffect(() => {
    if (props.teams !== undefined) {
      const length = props.teams.length;
      setFirst(props.teams[length - 1]);
      setSecond(props.teams[length - 2]);
      setThird(props.teams[length - 3]);
    }
  })

  return (
    <div>
      <div className="endscores">

        <div id="confettis">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>
        <Pillar team={first} classes={"first-pillar"} />
        <Pillar team={second} classes={"second"} />
        <Pillar team={third} classes={"third"} />
      </div>
    </div>
  );
};


function mapStateToProps(state) {
  return {
    teams: state.game.teams
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);