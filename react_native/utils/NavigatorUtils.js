/**
 * Created by panda on 16/8/1.
 */
'use strict';
import SplashScreen from '../pages/SplashScreen';
import MainScreen from '../pages/MainScreen';
import NewsDetailScreen from '../pages/NewsDetailScreen';
import MyWebView from '../component/MyWebView';

const PAGE_SPLASH = 'splash';
const PAGE_MAIN = 'main';
const PAGE_NEWSDETAIL = 'newsdetail';
const PAGE_WEBVIEW = 'webview';

export const getSplashNavigatorRoute = () => {
    return {
        component: SplashScreen,
        name: PAGE_SPLASH,
    }
};

export const getMainNavigatorRoute = () => {
    return {
        component: MainScreen,
        name: PAGE_MAIN,
    };
};

export const getNewsDetailNavigatorRoute = () => {
    return {
        component: NewsDetailScreen,
        name: PAGE_NEWSDETAIL,
    };
};

export const getWebViewNavigatorRoute = () => {
    return {
        component: MyWebView,
        name: PAGE_WEBVIEW,
    };
};
