import {
    getAgencyinfoData,
    getChildCourselistData,
    getCoursecategorylistData,
    getNoticedetailData,
    getNoticeinfosData
} from '../api/child'

// type类型定义
export const GET_AGENCYINFO = 'GET_AGENCYINFO'
export const GET_NOTICEINFOS = 'GET_NOTICEINFOS'
export const GET_CHILDCOURSELIST = 'GET_CHILDCOURSELIST'
export const GET_COURSECATEGORYLIST = 'GET_COURSECATEGORYLIST'
export const GET_NOTICEDETAIL = 'GET_NOTICEDETAIL'

// 常量

// action函数
export const getAgencyinfo = (data) => {
    return {
        type: GET_AGENCYINFO,
        payload: getAgencyinfoData(data)
    }
}
export const getNoticeinfos = (data) => {
    return {
        type: GET_NOTICEINFOS,
        payload: getNoticeinfosData(data)
    }
}
export const getChildCourselist = (data) => {
    return {
        type: GET_CHILDCOURSELIST,
        payload: getChildCourselistData(data)
    }
}
export const getCoursecategorylist = (data) => {
    return {
        type: GET_COURSECATEGORYLIST,
        payload: getCoursecategorylistData(data)
    }
}
export const getNoticedetail = (data) => {
    return {
        type: GET_NOTICEDETAIL,
        payload: getNoticedetailData(data)
    }
}