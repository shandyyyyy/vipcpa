import {GET_EXAM_ROOM, UPDATE_EXAM_ROOM, GET_ANSWER_CARD_DATA, GET_QUESTION_DATA, UPDATE_QUESTION, SUBMIT_EXERCISE} from '../actions/exercise'

export const examReducer = (state = {examResult: {count_down: 1000}, card: [], question: {}}, action) => {
    switch (action.type) {
        case `${GET_EXAM_ROOM}_SUCCESS`:
            return Object.assign({}, state, {examResult: action.payload.result});
        case UPDATE_EXAM_ROOM:
            let question = updateQestion(state.examResult.list, action.data);
            state.examResult.list = question;
            return Object.assign({}, state, {examResult: state.examResult});
        case `${GET_ANSWER_CARD_DATA}_SUCCESS`:
            return Object.assign({}, state, {card: action.payload.result});
        case `${GET_QUESTION_DATA}_SUCCESS`:
            return Object.assign({}, state, {question: action.payload.result});
        case UPDATE_QUESTION:
            state.question.list = action.data;
            return Object.assign({}, state, {question: state.question});
        case SUBMIT_EXERCISE:
            return Object.assign({}, state, {question: state.question});
        default:
            return state;
    }
}


function updateQestion(list, data) {
    for (let value of list) {
        if (value.question_id == data.question_id) {
            Object.assign(value, data);
            return list;
        }
    }
}