/**
 * Created by panda on 16/8/1.
 */
'use strict';
MainScreen
import MainScreen from './MainScreen';
import NewsDetailScreen from './NewsDetailScreen';
import MyWebView from './MyWebView';

const PAGE_MAIN = 'main';
const PAGE_NEWSDETAIL = 'newsdetail';
const PAGE_WEBVIEW = 'webview';

export const getMainNavigatorRoute = () => {
    return {
        component:MainScreen,
        name:PAGE_MAIN,
    };
}

export const getNewsDetailNavigatorRoute = () => {
    return {
        component:NewsDetailScreen,
        name:PAGE_NEWSDETAIL,
    };
}

export const getWebViewNavigatorRoute = () => {
    return {
        component:MyWebView,
        name:PAGE_WEBVIEW,
    };
}
