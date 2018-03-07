import {getexamdata} from '../api/finalexam'

//定义type类型
export const GET_EXAM_DATA = 'GET_EXAM_DATA'


//获取终极测试结果内容列表
export const GetExamData = (data) =>{
    return{
        type:GET_EXAM_DATA,
        payload:getexamdata(data)
    }
}
