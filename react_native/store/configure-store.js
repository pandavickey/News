/**
 * Created by panda on 16/8/29.
 */
'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer/index';

export default function configureStore(initialState) {
    return applyMiddleware(thunkMiddleware)(createStore)(rootReducer, initialState);
}