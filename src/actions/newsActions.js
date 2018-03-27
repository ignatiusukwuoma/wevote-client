import axios from 'axios';

import { beginAjaxCall } from "./ajaxStatusActions";
import { handleError } from '../utils/errorHandler';
import actionTypes from './constants';

const { API_URL } = process.env;
const { DISPLAY_NEWS_AJAX, DISPLAY_IMAGE } = actionTypes;

/**
 * Gets the latest news from INEC
 * @returns {function} dispatches displayNews
 */
export function getNews(){
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return axios.get(`${API_URL}/news/news`)
            .then((res) => {
                dispatch(displayNews(res.data.data));
            })
            .catch(error => handleError(error, dispatch));
    };
}

/**
 * Gets each featured image in the news
 * @param media_id {int} id of the image
 * @returns {function} dispatches displayImage
 */
export function getImage(media_id){
    return (dispatch) => {
        return axios.get(`${API_URL}/news/images?media_id=${media_id}`)
            .then((res) => {
                dispatch(displayImage(res.data.data.post, res.data.data.media_details.sizes.medium.source_url));
            })
            .catch(error => handleError(error, dispatch));
    };
}

/**
 * Creates action to provide the latest news
 * @param posts {array} All the latest news
 * @returns {{type: string, payload: array, error: boolean}}
 */
function displayNews(posts) {
    return {
        type: DISPLAY_NEWS_AJAX,
        payload: posts,
        error: false
    };
}

/**
 * Creates action to provide a featured image
 * @param post_id {int} id of the related news
 * @param source_url {string} url of the featured image
 * @returns {{type: string, payload: {post_id: int, source_url: string}}}
 */
function displayImage(post_id, source_url){
    return {
      type: DISPLAY_IMAGE,
        payload: {
          post_id,
          source_url
      }
    };
}
