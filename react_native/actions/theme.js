/**
 * Created by panda on 16/8/29.
 */
'use strict';
import * as types from '../utils/actionTypes';

export function fetchThemes() {
    return dispatch => {
        dispatch(fetchThemesList());
    };
}

function fetchThemesList() {
    return {
        type: types.FETCH_THEME_LIST,
        loading: true,
    };
}

function receiverThemesList(themeList) {
    return {
        type: types.RECEIVE_THEME_LIST,
        loading: false,
        themeList: themeList,
    };
}