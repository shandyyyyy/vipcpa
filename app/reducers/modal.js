import {
	SHOW_MODAL,
} from "../actions/modal";

export const changeModalReducer = (state = { show: false }, action)=>{
	switch (action.type){
		case SHOW_MODAL:
			return Object.assign({},state,{show: action.show});
		default:
			return Object.assign({},state);
	}
};