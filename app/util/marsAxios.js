import axios from 'axios';
import {
    Toast
} from 'antd-mobile';

import qs from 'qs';
import {
    getBaseUrl
} from './config';

import pubsub from './Pubsub';


axios.defaults.baseURL = getBaseUrl();
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.interceptors.request.use(function (config) {
    // config.data.agentToken = Cookies.get(MARS_TOKEN);
    return Promise.resolve(config);
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    console.log(response);
    /*if (response.data.code === 100) {
        localStorage.clear();
        location.href = '/#/login';
        return Promise.reject(response.data);
    } else if (response.data.code !== 0) {
        Toast.fail(response.data.message);
        return Promise.reject(response.data);
    }*/
    return Promise.resolve(response.data);
}, function (error) {
    return Promise.reject(error);
});

export default class marsAxios {
    constructor(options = {}) {
        this.options = options;
    }
    request(options) {
        return axios.request(options);
    }
    get(url, options = {}) {
        return this.request({
            url,
            params: {
                ...options
            }
        })
    }
    post(url, data, options = {}) {
        if (data instanceof Object) {
            data = qs.stringify(data);
        }
        return this.request({
            method: 'post',
            url:`${url}?${data}`,
            ...options
        });
    }
}

const instanceAxios = new marsAxios;
export const request = instanceAxios.request.bind(instanceAxios);
export const get = instanceAxios.get.bind(instanceAxios);
export const post = instanceAxios.post.bind(instanceAxios);