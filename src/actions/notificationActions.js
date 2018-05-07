import axios from 'axios';
import { throwError } from '../utils/errorHandler';
import {beginAjaxCall} from "./ajaxStatusActions";

const { API_URL } = process.env;

/**
 * Send notification to all users
 * @param {object} message
 * @returns {function}
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


export function getNotifications(){
    return (dispatch) => {
        return axios.get(`${API_URL}/user/notification`)
            .then((res) => {
                console.log('Notification response', res.data);
            })
            .catch(error => throwError(error, dispatch));
    };
}
