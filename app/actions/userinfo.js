import {
    getUserinfoData,
    updateUserinfoData
} from 'api/userinfo'

// type类型定义
export const GET_USERINFO = 'GET_USERINFO'
export const UPDATE_USERINFO = 'UPDATE_USERINFO'

// 常量

// action函数
export const getUserinfo = (data) => {
    return {
        type: GET_USERINFO,
        payload: getUserinfoData(data)
    }
}
export const updateUserinfo = (data) => {
    return {
        type: UPDATE_USERINFO,
        payload: updateUserinfoData(data)
    }
}