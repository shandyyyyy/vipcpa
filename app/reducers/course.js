import { GET_COURSE,GET_COURSELIST,GET_COURSEDETAIL,GET_COURSEVIDEOLIST,GET_VIDEOPATH,GET_QUESTION,OPEN_VIDEO,GET_PLAY_TIME,CHECK_PLAY_STATUS,CLOSE_VIDEO} from '../actions/course'
import { handleActions } from 'redux-actions'

//课程分类
export const classes = (state = {first:[],second:{}}, action) => {
    switch ( action.type ) {
        case `${GET_COURSE}_LOADING`:
        
            return state;

        case `${GET_COURSE}_SUCCESS`:
            const list =action.payload.result.list
            return Object.assign({}, state, list);

        case `${GET_COURSE}_ERROR`:
        
            return state;

        default:
            return state;
    }
}

//课程列表
export const courseList = (state = {data:[],total:""}, action) => {
    switch ( action.type ) {
        case `${GET_COURSELIST}_LOADING`:
        
            return state;

        case `${GET_COURSELIST}_SUCCESS`:
            const courseList =action.payload.result.list
            return Object.assign({}, state, courseList);

        case `${GET_COURSELIST}_ERROR`:
        
            return state;

        default:
            return state;
    }
}

// 详情
export const courseDetail = (state = {pkid:"",category:{},category_id:"",second_id:"",name:"",course_image:"",course_score:"",document_path:"",teacher:{},introduce:"",study_status:""}, action) => {
    switch ( action.type ) {
        case `${GET_COURSEDETAIL}_LOADING`:
        
            return state;

        case `${GET_COURSEDETAIL}_SUCCESS`:
            const detail =action.payload.result.list
            return Object.assign({}, state, detail);

        case `${GET_COURSEDETAIL}_ERROR`:
        
            return state;

        default:
            return state;
    }
}

//课程大纲
export const courseVideoList = (state = {list:[],studentId:""}, action) => {
    switch ( action.type ) {
        case `${GET_COURSEVIDEOLIST}_LOADING`:
        
            return state;

        case `${GET_COURSEVIDEOLIST}_SUCCESS`:
            const videoList =action.payload.result
            return Object.assign({}, state, videoList);

        case `${GET_COURSEVIDEOLIST}_ERROR`:
        
            return state;

        default:
            return state;
    }
}

//视频资源
export const videoPath = (state = {videoinfo:{},playdata:{}}, action) => {
    switch ( action.type ) {
        case `${GET_VIDEOPATH}_LOADING`:
        
            return state;

        case `${GET_VIDEOPATH}_SUCCESS`:
            const videoPath =action.payload.result.list
            return Object.assign({}, state, videoPath);

        case `${GET_VIDEOPATH}_ERROR`:
        
            return state;

        default:
            return state;
    }
}

//防作弊问题
export const questionData = (state = {title:"",answer:"",option_a:"",option_b:"",option_c:"",option_d:""}, action) => {
    switch ( action.type ) {
        case `${GET_QUESTION}_LOADING`:
        
            return state;

        case `${GET_QUESTION}_SUCCESS`:
            const question =action.payload.result.list[0]
            return Object.assign({}, state, question);

        case `${GET_QUESTION}_ERROR`:
        
            return state;

        default:
            return state;
    }
}

//打开视频
export const openVideoData = (state = {status:""}, action) => {
    switch ( action.type ) {
        case `${OPEN_VIDEO}_LOADING`:
        
            return state;

        case `${OPEN_VIDEO}_SUCCESS`:
            return Object.assign({}, state, action.payload.result);

        case `${OPEN_VIDEO}_ERROR`:
        
            return state;

        default:
            return state;
    }
}

//记录学习时间
export const playTimeData = (state = {status:''}, action) => {
    switch ( action.type ) {
        case `${GET_PLAY_TIME}_LOADING`:
        
            return state;

        case `${GET_PLAY_TIME}_SUCCESS`:
            return Object.assign({}, state, action.payload);

        case `${GET_PLAY_TIME}_ERROR`:
        
            return state;

        default:
            return state;
    }
}

//禁止同时播放
export const playStatusData = (state = {status:"",result:{},http_code:"",info:""}, action) => {
    switch ( action.type ) {
        case `${CHECK_PLAY_STATUS}_LOADING`:
        
            return state;

        case `${CHECK_PLAY_STATUS}_SUCCESS`:
        console.log(action.payload)
            return Object.assign({}, state, action.payload);

        case `${CHECK_PLAY_STATUS}_ERROR`:
        
            return state;

        default:
            return state;
    }
}

//视频结束
export const closeVideoData = (state = {}, action) => {
    switch ( action.type ) {
        case `${CLOSE_VIDEO}_LOADING`:
        
            return state;

        case `${CLOSE_VIDEO}_SUCCESS`:
            return Object.assign({}, state, action.payload);

        case `${CLOSE_VIDEO}_ERROR`:
        
            return state;

        default:
            return state;
    }
}