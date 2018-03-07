import {
    post
} from '../util/marsAxios';

//获取商品列表数据
export const getData = parameters => post('/api/open', {
    action_id: 3000,
    ...parameters
});

//获取项目列表
export const getProject = parameters => post('/api/open', {
    action_id: 5051,
    ...parameters
})

//删除商品
export const deleteProduct = parameters => post('/api/open', {
    action_id: 3005,
    ...parameters
})

//选择渠道商模糊查询
export const selectAgent = parameters => post('/api/open',{
	action_id:1014,
	...parameters
})