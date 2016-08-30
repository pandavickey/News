/**
 * Created by panda on 16/8/29.
 */
'use strict';

import {combineReducers} from 'redux';
import theme from '../reducer/theme'
import news from '../reducer/news'
const rootReducer = combineReducers({
    theme,
    news,
});
export default rootReducer;