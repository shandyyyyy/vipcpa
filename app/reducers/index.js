import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as main from './main';
import * as login from './login';
import * as course from './course';
import * as modal from './modal';
import * as room from './room';
const rootReducer = combineReducers({
    routing,
    config: (state = {}) => state,
    ...main,
    ...course,
    ...login,
    ...course,
    ...modal,
    ...room,
});

export default rootReducer;