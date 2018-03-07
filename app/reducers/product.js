import { GET_PRODUCT } from '../actions/product'
import { handleActions } from 'redux-actions'
export const getProduct = (state={b:1}, action)=>{
    switch(action.type){
        case `${GET_PRODUCT}_SUCCESS`:
            console.log(action.payload)
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}