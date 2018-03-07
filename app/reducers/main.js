import {
    GET_REGIONS, 
    GET_TEACHERS,
    GET_COURSES
} from '../actions/main'
import { handleActions } from 'redux-actions'

export const regions = (state = { province: [], city: [], agency: []}, action) => {
    switch ( action.type ) {
        case `${GET_REGIONS}_SUCCESS`:
            return Object.assign({}, state, action.payload.result.list);
        default:
            return state;
    }
}

export const teachers = (state = { list: [] }, action) => {
    switch (action.type) {
        case `${GET_TEACHERS}_SUCCESS`:
            return Object.assign({}, state, action.payload.result);
        default:
            return state;
    }
}

export const courses = (state = { list: [] }, action) => {
    switch (action.type) {
        case `${GET_COURSES}_SUCCESS`:
            return Object.assign({}, state, action.payload.result);
        default:
            return state;
    }
}