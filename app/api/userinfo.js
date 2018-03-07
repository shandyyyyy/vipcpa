import {get, post} from 'util/marsAxios'

// 获取学员信息
export const getUserinfoData = params => post('api/v1/student/studentinfo', params)

// 上传图片
export const uploadUserImg = params => post('api/v1/student/upload', params)

// 更新学员信息
export const updateUserinfoData = params => post('api/v1/student/update', params)