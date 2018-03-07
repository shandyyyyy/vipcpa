import {getHomeData} from '../api/home'
export const GET_PRODUCT = 'GET_PRODUCT'
export const getProduct =(data)=>{
    return {
        type: GET_PRODUCT,
        payload: getHomeData({a:1})
    }
}