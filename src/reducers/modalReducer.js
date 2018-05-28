import actionTypes from '../actions/constants';
import initialState from "../store/initialState";

const { MODAL_CHOICE } = actionTypes;

/**
 * Opens the selected modal
 * @param state
 * @param action
 * @returns {string} state
 */
export function currentModal(state=initialState.currentModal, action){
    switch(action.type){
        case MODAL_CHOICE:
            return action.payload;
        default:
            return state;
    }
}
