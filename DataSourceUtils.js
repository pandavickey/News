'use strict';

const API_START_IMAGE_URL = "http://news-at.zhihu.com/api/4/start-image/1080*1776";
const API_NEWS_URL = 'http://news-at.zhihu.com/api/4/news/latest';
const API_HISTORY_URL = 'http://news.at.zhihu.com/api/4/news/before/';
const API_THEME_URL = 'http://news-at.zhihu.com/api/4/theme/';
const API_THEMES_URL = 'http://news-at.zhihu.com/api/4/themes';
const API_NEWS_DETAIL = 'http://news.at.zhihu.com/api/4/news/';
const API_FIND_LIST = 'http://apis.baidu.com/txapi/mvtp/meinv?num=50';

export const getStartImage = () => {
    return fetch(API_START_IMAGE_URL).then((response) => response.json());
}

export const fetchNews = (themeId, lastId) => {
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
    console.log(url);
    return fetch(url).then((response) => response.json());
}

export const fetchThemes = () => {
    return fetch(API_THEMES_URL).then((response) => response.json());
}

export const fetchNewsDetail = (id) => {
    return fetch(API_NEWS_DETAIL + id).then((response) => response.json());
}

export const fetchFindList = () => {
    return fetch(API_FIND_LIST, {
        method: 'GET',
        headers: {
            'apikey': '6490bf9bc5026959648d0171f1417c7b',
        }
    }).then((response) => response.json());
}
