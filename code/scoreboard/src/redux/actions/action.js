import {
    ENTER_GAME_SUCCESS,
    ENTER_GAME_FAILED,
    LOAD_CURRENT_QUESTION_SUCCESS,
    LOAD_CURRENT_QUESTION_FAILED,
    LOAD_TEAMS_SUCCESS,
    LOAD_TEAMS_FAILED,
    GET_ANSWERS_SUCCESS,
    GET_ANSWERS_FAILED,
    GAME_ENDED,
    QUESTION_ENDED,
    QUESTION_STARTED,
    LOAD_ROUND_INFO_SUCCESS,
    LOAD_ROUND_INFO_FAILED
} from "./actionType.js";

export function enterGameSuccess(gameId) {
    return {
        type: ENTER_GAME_SUCCESS,
        gameId,
    };
}

export function enterGameFailed(message) {
    return {
        type: ENTER_GAME_FAILED,
        message
    }
}

export function loadCurrentQuestionSuccess(question) {
    return {
        type: LOAD_CURRENT_QUESTION_SUCCESS,
        question,
    };
}

export function loadCurrentQuestionFailed(message) {
    return {
        type: LOAD_CURRENT_QUESTION_FAILED,
        message
    }
}

export function loadTeamsSuccess(teams) {
    return {
        type: LOAD_TEAMS_SUCCESS,
        teams,
    };
}

export function loadTeamsFailed(message) {
    return {
        type: LOAD_TEAMS_FAILED,
        message
    }
}

export function getAnswersSuccess(teams) {
    return {
        type: GET_ANSWERS_SUCCESS,
        teams,
    };
}

export function getAnswersFailed() {
    return {
        type: GET_ANSWERS_FAILED,
    };
}

export function gameEnded() {
    return {
        type: GAME_ENDED,
    }
}

export function questionEnded() {
    return {
        type: QUESTION_ENDED,
    }
}

export function questionStarted() {
    return {
        type: QUESTION_STARTED
    }
}

export function loadRoundInfoSuccess(roundNumber, questionNumber) {
    if (roundNumber === 0) roundNumber = 1;
    if (questionNumber === 0) questionNumber = 1;
    return {
        type: LOAD_ROUND_INFO_SUCCESS,
        roundNumber,
        questionNumber
    }
}

export function loadRoundInfoFailed() {
    return {
        type: LOAD_ROUND_INFO_FAILED,
    }
}