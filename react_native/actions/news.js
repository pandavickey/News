/**
 * Created by panda on 16/8/30.
 */
'use strict';

import * as types from '../utils/actionTypes';
import {API_HISTORY_URL, API_NEWS_URL, API_THEME_URL} from '../utils/DataSourceUtils';

export default function fetchNewsList(themeId, lastId) {
    return dispatch => {
        //首页
        var url;
        if (themeId === 0) {
            if (lastId) {
                url = API_HISTORY_URL + lastId;
            } else {
                url = API_NEWS_URL;
            }
        } else {
            if (lastId) {
                url = API_THEME_URL + themeId + '/before/' + lastId
            } else {
                url = API_THEME_URL + themeId;
            }
        }
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                var newLastId;
                if (themeId == 0) {
                    newLastId = response.date;
                } else {
                    var length = response.stories.length;
                    if (length > 0) {
                        newLastId = response.stories[length - 1].id;
                    }
                }
                dispatch(endFetch(themeId, newLastId, response.stories, response.top_stories));

            })
            .catch((error) => {
                console.error(error);
            })
            .done();
    }
}

function endFetch(themeId, lastId, news, headNews) {
    return {
        type: types.RECEIVE_NEWS_LIST,
        themeId,
        lastId,
        news,
        headNews,
    };
}