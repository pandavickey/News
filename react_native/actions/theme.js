/**
 * Created by panda on 16/8/29.
 */
'use strict';
import * as types from '../utils/actionTypes';
import {API_THEMES_URL} from '../utils/DataSourceUtils';

export function fetchThemes() {
    return dispatch => {
        dispatch(startFetch());
        fetch(API_THEMES_URL)
            .then((response) => response.json())
            .then((response) => {
                var theme = {
                    id: 0,
                    name: '首页',
                };
                response.others.unshift(theme);
                dispatch(endFetch(response.others.slice(0,8)));
            })
            .catch((error) => {
                console.error(error);
            })
            .done();
    };
}

function startFetch() {
    return {
        type: types.FETCH_THEME_LIST,
        loading: true,
    };
}

function endFetch(themes) {
    return {
        type: types.RECEIVE_THEME_LIST,
        loading: false,
        themeList: themes,
    };
}