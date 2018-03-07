import {post, get} from '../util/marsAxios';

//激活培训
export const getTrainList = params => post('api/v1/trainingorder/isactivetrainlist',params)

//课程学习
export const getCourseLearn = params => post('api/v1/learn/learnList',params)

//确认订单
export const confirmOrder = params => post('api/v1/trainingorder/createtrainingorder',params)
