import { handleActions } from 'redux-actions'
import {
    GET_USERINFO,
    UPDATE_USERINFO
} from 'actions/userinfo'

export const userinfo = (state = { county: [], student: {}, token: ''}, action) => {
    switch (action.type) {
        case `${GET_USERINFO}_SUCCESS`:
            localStorage.setItem('userInfo', JSON.stringify(action.payload.result))
            return Object.assign({}, state, action.payload.result);

        case `${UPDATE_USERINFO}_SUCCESS`:
            // localStorage.setItem('userInfo', JSON.stringify(action.payload.result))
            // return Object.assign({}, state, action.payload.result);
            return state;

        default:
            let user = localStorage.getItem('userInfo') || '{}'
            return Object.assign({}, state, JSON.parse(user));
    }
}