import {
  enterGameFailed,
  enterGameSuccess,
  loadRoundInfoFailed,
  loadRoundInfoSuccess,
  getAnswersFailed,
  getAnswersSuccess,
  loadCurrentQuestionFailed,
  loadCurrentQuestionSuccess,
  loadTeamsFailed,
  loadTeamsSuccess,
} from "./action";

const serverUrl = "http://localhost:3000";

export function enterGame(gameId) {
  return (dispatch) => {
    fetch(`${serverUrl}/games/${gameId}`).then((response) => {
      if (response.status === 404) {
        dispatch(enterGameFailed("Game does not exist"));
      } else if (response.status === 200) {
        dispatch(enterGameSuccess(gameId));
      }
    });
  };
}

export function loadCurrentQuestion() {
  return (dispatch, getState) => {
    const state = getState();
    fetch(`${serverUrl}/questions/currentquestion/${state.game.gameId}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((question) => {
        dispatch(loadCurrentQuestionSuccess(question));
      })
      .catch((err) => {
        dispatch(loadCurrentQuestionFailed("No question yet"));
      });
  };
}

export function loadTeams() {
  return (dispatch, getState) => {
    const state = getState();
    fetch(`${serverUrl}/games/${state.game.gameId}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((teams) => {
        dispatch(loadTeamsSuccess(teams));
      })
      .catch((err) => {
        dispatch(loadTeamsFailed("No teams yet"));
      });
  };
}

export function getPlayerAnswers() {
  return (dispatch, getState) => {
    const state = getState();
    fetch(`${serverUrl}/teams/${state.game.gameId}/answers`)
      .then((reponse) => reponse.json())
      .then((teams) => {
        dispatch(getAnswersSuccess(teams));
      })
      .catch(() => {
        dispatch(getAnswersFailed());
      });
  };
}

export function getRoundInfo() {
  return (dispatch, getState) => {
    const state = getState();
    fetch(`${serverUrl}/games/${state.game.gameId}/rounds`)
      .then((reponse) => reponse.json())
      .then((rounds) => {
        let roundstate = rounds.length;
        if (roundstate % 12 != 0) {
          roundstate = rounds.length % 12;
        } else {
          roundstate = 12;
        }
        dispatch(
          loadRoundInfoSuccess(Math.ceil(rounds.length / 12), roundstate)
        );
      })
      .catch(() => {
        dispatch(loadRoundInfoFailed());
      });
  };
}
