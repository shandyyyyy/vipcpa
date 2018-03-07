import { ADDRESS_CURRENT,ADDRESS_UPDATE } from '../actions/welcome'
export const testWelcome = (state={a:1}, action)=>{
    switch(action.type){
        case `${ADDRESS_CURRENT}_SUCCESS`:
            return Object.assign({},state,action.payload);
        case `${ADDRESS_CURRENT}_ERROR`:
            return state;
        case ADDRESS_UPDATE:
            return Object.assign({},state,action.data);
        default:
            return state;
    }
}