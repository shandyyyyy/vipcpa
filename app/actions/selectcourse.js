import {selectCourse,selectList,submitSelect} from '../api/selectcourse'
// 定义type类型
export const SELECT_COURSE = 'SELECT_COURSE'
export const SELECT_LIST ='SELECT_LIST'
export const SUBMIT_SELECT ='SUBMIT_SELECT'

//选择课程tit
export const selectCourseData = (data) =>{
    return{
        type:SELECT_COURSE,
        payload:selectCourse(data)
    }
}

//课程list
export const selectListData =(data) =>{
    return{
        type:SELECT_LIST,
        payload:selectList(data)
    }
}

//提交选择课程
export const SubmitSelectData = (data) =>{
    return{
        type:SUBMIT_SELECT,
        payload:submitSelect(data)
    }
}