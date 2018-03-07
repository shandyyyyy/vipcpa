import {getExamRoomData, getAnswerCardData, getQuestionData, submitExerciseData} from '../api/course';

export const GET_EXAM_ROOM = 'GET_EXAM_LIST'
export const UPDATE_EXAM_ROOM = 'UPDATE_EXAM_ROOM'
export const GET_ANSWER_CARD_DATA = 'UPDATE_EXAM_ROOM'
export const GET_QUESTION_DATA = 'GET_QUESTION_DATA'
export const UPDATE_QUESTION = 'UPDATE_QUESTION'
export const SUBMIT_EXERCISE = 'SUBMIT_EXERCISE'
export const loadExamRoom = examId => {
    return {
        type: GET_EXAM_ROOM,
        payload: getExamRoomData({
            exam_id: examId
        })
    }
}
export const updateExamRoom = data => {
    return {
        type: UPDATE_EXAM_ROOM,
        data
    }
}

export const getAnswerCard = courseId => {
    return {
        type: GET_ANSWER_CARD_DATA,
        payload: getAnswerCardData({
            course_id: courseId
        })
    }
}

export const getQuestion = objParams => {
    return {
        type: GET_QUESTION_DATA,
        payload: getQuestionData(objParams)
    }
}

export const updateQuestion = data => {
    return {
        type: UPDATE_QUESTION,
        data,
    }
}

export const submitExercise = objParams => {
    return {
        type: SUBMIT_EXERCISE,
        payload: submitExerciseData(objParams)
    }
}
