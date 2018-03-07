import {
    getLoginData,
    getDisplaycaptchaData,
    getCaptchaData,
    getLogoutData,
    getRegistData,
    checkUniquenessData
} from '../api/login'

// type类型定义
export const GET_LOGIN = 'GET_LOGIN'
export const GET_GETDISPLAYCAPTCHA = 'GET_GETDISPLAYCAPTCHA'
export const GET_CAPTCHA = 'GET_CAPTCHA'
export const GET_LOGOUT = 'GET_LOGOUT'
export const GET_REGIST = 'GET_REGIST'

export const TOGGLE_LOGINDialog = 'TOGGLE_LOGINDialog'
export const TOGGLE_REGISTDialog = 'TOGGLE_REGISTDialog'
export const CHECK_UNIQUENESS = 'CHECK_UNIQUENESS'
// 常量

// action函数
export const getLogin = (data) => {
    return {
        type: GET_LOGIN,
        payload: getLoginData(data)
    }
}
export const getDisplaycaptcha = (data) => {
    return {
        type: GET_GETDISPLAYCAPTCHA,
        payload: getDisplaycaptchaData(data)
    }
}
export const getCaptcha = (data) => {
    return {
        type: GET_CAPTCHA,
        payload: getCaptchaData(data)
    }
}
export const getLogout = (data) => {
    return {
        type: GET_LOGOUT,
        payload: getLogoutData(data)
    }
}
export const getRegist = (data) => {
    return {
        type: GET_REGIST,
        payload: getRegistData(data)
    }
}
export const toggleLoginDialog = (data) => {
    return {
        type: TOGGLE_LOGINDialog,
        payload: data
    }
}
export const toggleRegistDialog = (data) => {
    return {
        type: TOGGLE_REGISTDialog,
        payload: data
    }
}
export const checkUniqueness = (data) => {
    return {
        type: CHECK_UNIQUENESS,
        payload: checkUniquenessData(data)
    }
}