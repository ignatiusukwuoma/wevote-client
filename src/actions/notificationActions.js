import axios from 'axios';
import { handleError, throwError } from '../utils/errorHandler';
import {beginAjaxCall} from "./ajaxStatusActions";

const { API_URL } = process.env;

/**
 * Creates a new notification
 * @param {object} message
 * @returns {function} saveToken
 */
export function sendNotification(message){
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return axios.post(`${API_URL}/notification/send`, message)
            .then((res) => {
                console.log('Notification response', res.data);
            })
            .catch(error => throwError(error, dispatch));
    };
}
