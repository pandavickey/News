/**
 * Created by panda on 16/8/29.
 */
'use strict';

import {combineReducers} from 'redux';
import theme from '../reducer/theme'
const rootReducer = combineReducers({
    theme,
})
export default rootReducer;