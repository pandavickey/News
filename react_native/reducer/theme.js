/**
 * Created by panda on 16/8/29.
 */
'use strict';

import * as types from '../utils/actionTypes';

const initialState = {
    loading: true,
    themeList: {},
};

export default function theme(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_THEME_LIST:
            return Object.assign({}, state, {
                loading: true,
            });
        case types.RECEIVE_THEME_LIST:
            return Object.assign({}, state, {
                loading: false,
                themeList: action.themeList,
            });
        default:
            return state;
    }
}