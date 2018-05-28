import actionTypes from './constants';
const { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } = actionTypes;

/**
 * Action creator that's called when ajax call begins
 * @returns {object} action
 */
export function beginAjaxCall() {
    return { type: BEGIN_AJAX_CALL };
}

/**
 * Action creator called on ajax call error
 * @returns {object} action
 */
export function ajaxCallError() {
    return { type: AJAX_CALL_ERROR };
}
