import { post, get } from 'util/marsAxios';

// 登录
export const getLoginData = params => post('api/v1/student/commonlogin', params);

// 验证是否显示验证码
export const getDisplaycaptchaData = params => post('api/v1/student/displaycaptcha', params);

// 获取验证码
export const getCaptchaData = params => post('api/v1/public/createcaptcha', params);

// 登出
export const getLogoutData = params => post('api/v1/student/logout', params);

// 注册
export const getRegistData = params => post('api/v1/student/commonregister', params);

// 注册时验证唯一性
export const checkUniquenessData = params => post('api/v1/student/checkuniqueness', params);
