import { useEffect, useState } from "react";
import { createGame, removeTeam } from "../../redux/actions/postData";
import { getAllTeams } from "../../redux/actions/getData";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Prompt, useHistory } from "react-router";
import SelectTeamsList from "../SelectTeamsList";
import { startGame } from "../../redux/actions/action";

const SelectTeamsScreen = (props) => {
  const [teams, setTeams] = useState();
  const history = useHistory();

  if (props.gameId !== undefined && props.gameId !== "")
    localStorage.gameId = props.gameId;

  const getTeam = () => {
    props.getAllTeams();
    setTeams(props.teams);
  };

  useEffect(() => {
    getTeam();
  }, []);

  useEffect(() => {
    setTeams(props.teams);
  }, [props.teams]);

  const removeteam = (teamName) => {
    props.removeTeam(teamName);
    getTeam();
  };
  return (
    <form
      className="selectteams"
      onSubmit={(e) => {
        e.preventDefault();
        localStorage.teams = JSON.stringify(teams);
        props.startGame();
        history.push("/categorypicker");
      }}
    >
      <div className="gameid">
        <h1>Game ID: {localStorage.gameId}</h1>
      </div>
      <div className="teams">
        <h2>Teams</h2>
        <ul>
          {teams && teams.length > 0 ? (
            teams.map((players, id) => {
              return (
                <SelectTeamsList
                  teamName={players}
                  key={id}
                  onDelete={removeteam}
                />
              );
            })
          ) : (
            <li> waiting for players </li>
          )}
        </ul>
      </div>
      <div>
        {teams && teams.length > 1 ? (
          <button type="submit" className="btn btn-primary btn-center">
            start game
          </button>
        ) : (
          <button disabled className="btn btn-primary btn-center">
            min. 2 teams
          </button>
        )}
        <Prompt
          when={true}
          message={`Start the game with ${teams && teams.length > 0 ? teams.length : 0
            } teams`}
        />
      </div>
    </form>
  );
};

const TeamList = (props) => {
  if (props.teams[0] === undefined) {
    return <p>no teams yet...</p>;
  }

  const list = props.teams.map((team) => (
    <li key={team.players}>
      {team.players}
      <button type="button" className="cross"></button>
    </li>
  ));
  return <ul>{list}</ul>;
};

function mapStateToProps(state) {
  return {
    gameId: state.game.gameId,
    teams: state.game.teams,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createGame: createGame,
      getAllTeams: getAllTeams,
      removeTeam: removeTeam,
      startGame: startGame,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeamsScreen);
