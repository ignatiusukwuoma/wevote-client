import axios from 'axios';

import { beginAjaxCall } from "./ajaxStatusActions";
import { handleError } from '../utils/errorHandler';
import actionTypes from './constants';

const { API_URL } = process.env;
const { SAVE_VRI_AJAX, GET_USER_VRI_AJAX } = actionTypes;

/**
 * Saves user VRI
 * @param {object} responses
 * @returns {function}
 */
export function saveVri(responses){
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return axios.post(`${API_URL}/user/vri`, responses)
            .then(() => {
                dispatch({
                    type: SAVE_VRI_AJAX,
                    payload: responses,
                    error: false
                });
            })
            .catch(error => handleError(error, dispatch));
    };
}

/**
 * Gets the user VRI score
 * @returns {function}
 */
export function getUserVri(){
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return axios.get(`${API_URL}/user/vri/`)
            .then((res) => {
                dispatch({
                    type: GET_USER_VRI_AJAX,
                    payload: res.data,
                    error: false
                });
            })
            .catch(error => handleError(error, dispatch));
    };
}
