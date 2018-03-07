import {
    post
} from '../util/marsAxios';

// 登录
// "/user/login?name=" + encodeURIComponent(userName) + "&password=" + Hash.md5(userPassword),
export const userLogin = parameters => post('/user/login', {
    ...parameters
});