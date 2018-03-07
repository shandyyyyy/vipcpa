import { post, get } from 'util/marsAxios';

// 子站筛选课程数据
export const getChildCourselistData = params => post('api/v1/agency/courselist', params);

// 子站课程筛选条件
export const getCoursecategorylistData = params => post('api/v1/agency/coursecategorylist', params);

// 机构信息
export const getAgencyinfoData = params => post('api/v1/agency/agencyinfo', params);

// 通告详情
export const getNoticedetailData = params => post('api/v1/agency/noticedetail', params);

// 通告详情
export const getNoticeinfosData = params => post('api/v1/agency/noticeinfos', params);