import {SELECT_COURSE,SELECT_LIST,SUBMIT_SELECT} from '../actions/selectcourse'
import {handleActions} from 'redux-actions'

export const SelectCourseList = (state = {
    list:[]
},action) =>{
    switch(action.type){
        case `${SELECT_COURSE}_LOADING`:
        return state;

        case `${SELECT_COURSE}_SUCCESS`:
        const list = action.payload.result;
        return Object.assign({},state,list)

        case `${SELECT_COURSE}_ERROR`:
        return state;

        default:
        return state;
    }
}

export const SelectListData = (state = {
    list:[]
},action) =>{
    switch(action.type){
        case `${SELECT_LIST}_LOADING`:
        return state;

        case `${SELECT_LIST}_SUCCESS`:
        const list = action.payload.result;
        return Object.assign({},state,list)

        case `${SELECT_LIST}_ERROR`:
        return state;

        default:
        return state;
    }
}

export const SubmitSelect = ((state={
    list:[]
},action) => {
    switch(action.type){
        case `${SUBMIT_SELECT}_LOADING`:
        return state;
        
        case `${SUBMIT_SELECT}_SUCCESS`:
        const subSelect = action.payload.result;
        return Object.assign({},state,subSelect);

        case `${SUBMIT_SELECT}_ERROR`:
        return state;

        default:
        return state;
    }
})

