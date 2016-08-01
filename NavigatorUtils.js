/**
 * Created by panda on 16/8/1.
 */
'use strict';
MainScreen
import MainScreen from './MainScreen';
import NewsDetailScreen from './NewsDetailScreen';

const PAGE_MAIN = 'main';
const PAGE_NEWSDETAIL = 'newsdetail';

export const getMainNavigator = () => {
    return {
        component:MainScreen,
        name:PAGE_MAIN,
    };
}

export const getNewsDetailNavigator = () => {
    return {
        component:NewsDetailScreen,
        name:PAGE_NEWSDETAIL,
    };
}
