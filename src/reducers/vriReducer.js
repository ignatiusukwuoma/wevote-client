import initialState from "../store/initialState";
import actionTypes from '../actions/constants';

const { SAVE_VRI_AJAX, GET_USER_VRI_AJAX } = actionTypes;

/**
 * Simplifies the choices sent by the server
 * @param choices
 * @returns {object} responses
 */
function getResponses(choices){
    let responses = {};
    choices.forEach((choice) => {
       responses[choice.code] = choice.choice;
    });
    return responses;
}

/**
 * Manages the state of vri
 * @param state
 * @param action
 * @returns {object} state
 */
export function vri(state=initialState.vri, action){
    switch(action.type){
        case SAVE_VRI_AJAX:
            return {...state, responses: action.payload};
        case GET_USER_VRI_AJAX:
            return {...state,
                responses: getResponses(action.payload.data),
                score: action.payload.score};
        default:
            return state;
    }
}
