import { gameHasStopped, removedFromGame } from "./action";
import history from "../../history/history";

export function removeFromGame(gameId, name) {
    return dispatch => {
        history.push("/removed");
        window.location.reload();
        dispatch(removedFromGame)
    };
}

export function gameStopped() {
    return dispatch => {
        history.push("/gamestopped");
        window.location.reload();
        dispatch(gameHasStopped());
    }
}