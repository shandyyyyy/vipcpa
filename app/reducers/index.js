import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as main from './main';
import * as child from './child';
import * as login from './login';
import * as userinfo from './userinfo';
import * as course from './course';
import * as member from './member';
import * as exercise from './exercise';
import * as selectcourse from './selectcourse';
import * as modal from './modal';
const rootReducer = combineReducers({
    routing,
    config: (state = {}) => state,
    ...main,
    ...course,
    ...member,
    ...child,
    ...login,
    ...userinfo,
    ...course,
    ...exercise,
    ...selectcourse,
    ...modal,
});

export default rootReducer;