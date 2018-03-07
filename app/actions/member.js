import {getTrainList,getCourseLearn,confirmOrder,selectCourse} from '../api/member'
//定义type类型
export const GET_ACTIVE_TRAIN_LIST = 'GET_ACTIVE_TRAIN_LIST'
export const GET_COURSE_LEARN ='GET_COURSE_LEARN'
export const SET_SELECT = 'SET_SELECT'
export const CONFIRM_PAY = 'CONFIRM_PAY'
//设置action
export const getActiveListdata = (data) =>{
    return{
        type:GET_ACTIVE_TRAIN_LIST,
        payload:getTrainList(data)
    }
}


export const setSelect = (record,selected) =>{
    return{
        type:SET_SELECT,
        row:{record, selected}
    }
}

export const confirmPay = (data) =>{
    return{
        type:CONFIRM_PAY,
        payload:confirmOrder(data)
    }
}

//课程学习
export const getCourseData = (data) =>{
    return{
        type:GET_COURSE_LEARN,
        payload:getCourseLearn(data)
    }
}

