// 代理商信息
import {
    post
} from '../util/marsAxios';

//获取渠道
export const getChannel = parameters => post('/api/open', {
    action_id: 4002,
    ...parameters
})