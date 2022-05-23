import TeamCard from "./TeamCard";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useEffect, useState } from "react";

const QuestionField = (props) => {
  const [teams, setTeams] = useState(props.teams);
  const [teamsWithAnswer, setTeamsWithAnswer] = useState(props.teamsWithAnswer);

  useEffect(() => {
    setTeams(props.teams);
    setTeamsWithAnswer(props.teamsWithAnswer);
  })

  return (
    <div className="field-wrapper">
      <h2>Question: </h2>
      <p>{props.currentCategory}</p>
      <h3>{props.currentQuestion}</h3>
      <TeamCards teams={teams} teamsWithAnswer={teamsWithAnswer} />
    </div >
  );
};

const TeamCards = (props) => {
  if (props.teams === undefined) {
    return "No teams yet...";
  }

  else {
    const maxScore = Math.max.apply(Math, props.teams.map(function (team) { return team.score }));

    const teamlist = props.teams.map(team => {
      let classes = "teamcard ";
      if (maxScore === team.score && maxScore !== 0) classes = classes.concat("first ");
      if (props.teamsWithAnswer === null || !props.teamsWithAnswer.includes(team.players)) classes = classes.concat("disabled ");
      return (<TeamCard key={team.players} classes={classes} name={team.players} score={team.score} />)
    }
    );

    return (<div className="submittedanswers"> {teamlist}</div>)
  }
}

function mapStateToProps(state) {
  return {
    currentQuestion: state.game.currentQuestion,
    teams: state.game.teams,
    teamsWithAnswer: state.game.teamsWithAnswer,
    currentCategory: state.game.currentCategory
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionField);
