import { handleActions } from 'redux-actions'
import {
    GET_LOGIN,
    GET_GETDISPLAYCAPTCHA,
    GET_CAPTCHA,
    GET_LOGOUT,
    GET_REGIST,
    TOGGLE_LOGINDialog,
    TOGGLE_REGISTDialog,
    CHECK_UNIQUENESS
} from '../actions/login'

/**
 * 获取登录后饭返回的token（是的你没看错只返回了token，要用户信息吗，到userinfo去拿吧…………）
 * @param {*} state 
 * @param {*} action 
 */
export const login = (state = { showLogin: false, showRegist: false, result: {token: ''}}, action) => {
    switch (action.type) {
        case `${GET_LOGIN}_SUCCESS`:
            let payloadData = action.payload
            // 如果登录ok就把token存入storage
            if (!payloadData.status) {
                localStorage.setItem("token", payloadData.result.token)
            }
            return Object.assign({}, state, action.payload);
        case TOGGLE_LOGINDialog:
            return Object.assign({}, state, { showLogin: action.payload })

        case TOGGLE_REGISTDialog:
            return Object.assign({}, state, { showRegist: action.payload })
        
        // 注册完成后直接登录 
        case `${GET_REGIST}_SUCCESS`:
            let RegistPayloadData = action.payload
            // 如果登录ok就把token存入storage
            if (!RegistPayloadData.status) {
                localStorage.setItem("token", RegistPayloadData.result.token)
            }
            return Object.assign({}, state, action.payload);

        default:
            // 每次页面初始话就去storage里拿token吧（这玩意是用来验证是否登录用的）
            let token = localStorage.getItem('token') || ''
            return Object.assign({}, state, { result: { token: token } });
    }
}

/**
 * 验证是否需显示验证码
 * @param {*} state 
 * @param {*} action 
 */
export const displaycaptcha = (state = {}, action) => {
    switch (action.type) {
        case `${GET_GETDISPLAYCAPTCHA}_SUCCESS`:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

/**
 * 获取验证码
 * @param {*} state 
 * @param {*} action 
 */
export const captcha = (state = {}, action) => {
    switch (action.type) {
        case `${GET_CAPTCHA}_SUCCESS`:
            return Object.assign({}, state, action.payload.result);
            
        default:
            return state;
    }
}

/**
 * 登出返回信息
 * @param {*} state 
 * @param {*} action 
 */
export const logout = (state = {}, action) => {
    switch (action.type) {
        case `${GET_LOGOUT}_SUCCESS`:
            let payloadData = action.payload
            // 好了，登出成功，把storage干掉吧
            if (!payloadData.status) {
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                location.href = '/'
            }            
            return Object.assign({}, state, action.payload.result);
            
        default:
            return state;
    }
}

/**
 * 注册返回信息
 * @param {*} state 
 * @param {*} action 
 */
export const regist = (state = {}, action) => {
    switch (action.type) {
        case `${GET_REGIST}_SUCCESS`:
            return Object.assign({}, state, action.payload.result);
            
        default:
            return state;
    }
}

export const uniqueness = (state = {}, action) => {
    switch (action.type) {
        case `${CHECK_UNIQUENESS}_SUCCESS`:            
            return Object.assign({}, state, action.payload.result);
    
        default:
            return state;
    }
}