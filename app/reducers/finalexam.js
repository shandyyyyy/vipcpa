import {GET_EXAM_DATA} from '../actions/finalexam'
import {handleActions} from 'redux-actions'

export const GetExam = ( state={
    list:[]
},action)=>{
    switch(action.type){
        case `${GET_EXAM_DATA}_LOADING`:
        return state;

        case `${GET_EXAM_DATA}_SUCCESS`:
        const Examlist = action.payload.result;
        return Object.assign({},state,Examlist);

        case `${GET_EXAM_DATA}_ERROR`:
        return state;

        default:
        return state;
    }
}