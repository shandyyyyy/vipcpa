import {
    getRegionsData, 
    getTeachersData, 
    getCoursesData 
} from '../api/main'

// type类型定义
export const GET_REGIONS = 'GET_REGIONS'
export const GET_TEACHERS = 'GET_TEACHERS'
export const GET_COURSES = 'GET_COURSES'

// 常量

// action函数
export const getRegions = (data) => {
    return {
        type: GET_REGIONS,
        payload: getRegionsData()
    }
}
export const getTeachers = (data) => {
    return {
        type: GET_TEACHERS,
        payload: getTeachersData()
    }
}
export const getCourses = (data) => {
    return {
        type: GET_COURSES,
        payload: getCoursesData()
    }
}