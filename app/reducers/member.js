import {GET_ACTIVE_TRAIN_LIST, GET_COURSE_LEARN, SET_SELECT ,CONFIRM_PAY} from '../actions/member';
import {handleActions} from 'redux-actions'

export const ActiveTrainList = (state = {
    list: []
}, action) => {
    switch (action.type) {
        case `${GET_ACTIVE_TRAIN_LIST}_LOADING`:
            return state;

        case `${GET_ACTIVE_TRAIN_LIST}_SUCCESS`:
            const list = action.payload.result;
            return Object.assign({}, state, list);

        case `${GET_ACTIVE_TRAIN_LIST}_ERROR`:
            return state

        case SET_SELECT:
        // console.log('do')
            let SelectList = state.list;
            let {record, selected} = action.row;
            // console.log(record,selected)
            console.log(SelectList.length)
            for (let i = 0; i < SelectList.length; i++) {
                let el = SelectList[i];
                // pkid
                if (el.year == record.data.year) {
                    
                    SelectList[i].status = "2"
                }
            }
            
            return Object.assign({}, state, SelectList);

        default:
            return state
    }
}
//激活培训提交订单
export const ConfirmOrder = (state ={
    
},action) =>{
    switch(action.type){
        case `${CONFIRM_PAY}_LOADING`:
        return state ;

        case `${CONFIRM_PAY}_SUCCSEE`:
        const ConfirmList =action.payload;
        return Object.assign({},state,ConfirmList);

        case `${CONFIRM_PAY}_ERROR`:
        return state

        default:
        return state
    }
}

//课程学习
export const CourseLearnList = (state = {
    active: [],
    history: [],
    token: ''
}, action) => {
    switch (action.type) {
        case `${GET_COURSE_LEARN}_LOADING`:
            return state;

        case `${GET_COURSE_LEARN}_SUCCESS`:
            const CourseList = action.payload.result;
            return Object.assign({}, state, CourseLearnList);

        case `${GET_COURSE_LEARN}_ERROR`:
            return state;

        default:
            return state
    }
}


