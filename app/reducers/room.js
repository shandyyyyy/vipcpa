import {
    TAB_INDEX,
} from "../actions/room";

export const changeTabIndexReducer = (state = { index: 0 }, action)=>{
    switch (action.type){
        case TAB_INDEX:
            return Object.assign({},state,{index: action.index});
        default:
            return Object.assign({},state);
    }
};