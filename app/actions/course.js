import {getClasses,getCourseList,getCourseDetail,getCoursevideolist,getVideoPath,getQuestion,getOpenVideo,getplayTime,getPlayStatus,getCloseVideo} from '../api/course'
export const GET_COURSE = 'GET_COURSE'
export const GET_COURSELIST = 'GET_COURSELIST'
export const GET_COURSEDETAIL = 'GET_COURSEDETAIL'
export const GET_COURSEVIDEOLIST = 'GET_COURSEVIDEOLIST'
export const GET_VIDEOPATH = 'GET_VIDEOPATH'
export const GET_QUESTION = 'GET_QUESTION'
export const OPEN_VIDEO = 'OPEN_VIDEO'
export const GET_PLAY_TIME = 'GET_PLAY_TIME'
export const CHECK_PLAY_STATUS = 'CHECK_PLAY_STATUS'
export const CLOSE_VIDEO = 'CLOSE_VIDEO'

export const getClassesData =(data)=>{
    return {
        type: GET_COURSE,
        payload: getClasses()
    }
}

export const getCourseListData =(data)=>{
    return {
        type: GET_COURSELIST,
        payload: getCourseList(data)
    }
}

export const getCourseDetailData=(data)=>{
    return {
        type: GET_COURSEDETAIL,
        payload: getCourseDetail(data)
    }
}

export const getCourseVideoListData=(data)=>{
    return {
        type: GET_COURSEVIDEOLIST,
        payload: getCoursevideolist(data)
    }
}

export const getVideoPathData=(data)=>{
    return {
        type: GET_VIDEOPATH,
        payload: getVideoPath(data)
    }
}

export const getQuestionData=(data)=>{
    return {
        type: GET_QUESTION,
        payload: getQuestion(data)
    }
}

export const getOpenVideoData=(data)=>{
    return {
        type: OPEN_VIDEO,
        payload: getOpenVideo(data)
    }
}

export const getPlayTimeData=(data)=>{
    return {
        type: GET_PLAY_TIME,
        payload: getplayTime(data)
    }
}

export const getPlayStatusData=(data)=>{
    return {
        type: CHECK_PLAY_STATUS,
        payload: getPlayStatus(data)
    }
}

export const getCloseVideoData=(data)=>{
    return {
        type: CLOSE_VIDEO,
        payload: getCloseVideo(data)
    }
}