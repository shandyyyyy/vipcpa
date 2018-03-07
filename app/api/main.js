import { post, get } from 'util/marsAxios';

// 获取教育地区
export const getRegionsData = params => post('api/v1/index/regions', params);

// 获取推荐教师
export const getTeachersData = params => post('api/v1/index/recommendteacher', params);

export const getCoursesData = params => post('api/v1/index/recommendcourse', params);