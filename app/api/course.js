import {post, get} from '../util/marsAxios';

export const getClasses = params => post('api/v1/course/coursecategorylist', params);
export const getCourseList = params => post('api/v1/course/courselist', params);
export const getCourseDetail = params => post('api/v1/course/coursedetail', params);
export const getCoursevideolist = params => post('api/v1/course/coursevideolist', params);
export const getVideoPath = params => post('api/v1/course/video', params);
export const getQuestion = params => post('api/v1/course/anticheatquestion', params);
export const getOpenVideo = params => post('api/v1/course/openvideo', params);
export const getplayTime = params => post('api/v1/course/playinglog', params);
export const getPlayStatus = params => post('api/v1/course/checkplaystatus', params);
export const getCloseVideo = params => post('api/v1/course/closevideo', params);


export const getExamRoomData = params => post('api/v1/examine/examRoom', params);   // 考试题

export const saveAnswer = params => post('api/v1/examine/questionWrite', params);   // 保存用户答案

export const markExam = params => post('api/v1/examine/markExam', params);   // 交卷

export const getAnswerCardData = params => post('api/v1/question/answercard', params);   // 答题卡

export const getQuestionData = params => post('api/v1/question/questionList', params);   // 练习题

export const submitExerciseData = params => post('api/v1/question/submit', params);   // 保存练习题



