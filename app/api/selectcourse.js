import {post, get} from '../util/marsAxios';


//选择课程tit
export const selectCourse = params => post('api/v1/select/traininglist',params)

//通过tit获取全部课程
export const selectList = params => post('api/v1/select/courselist',params)

//提交选择的课程

export const submitSelect = params => post('api/v1/select/doselect',params)