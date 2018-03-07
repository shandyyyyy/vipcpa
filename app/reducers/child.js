import {
    GET_AGENCYINFO,
    GET_CHILDCOURSELIST,
    GET_COURSECATEGORYLIST,
    GET_NOTICEDETAIL,
    GET_NOTICEINFOS
} from '../actions/child'
import { handleActions } from 'redux-actions'

export const childReducer = (
    state = {
        agencyinfo: { index_menu: []},
        childCourselist: {list: []},
        childCoursecategorylist: { year: [], classify: [], course: {}, group: [] },
        noticedetail: {},
        noticeinfos: { notice: {}, common_problem: {}, learning_process: {} }
    },
    action
)=> {
    switch (action.type) {
        case `${GET_AGENCYINFO}_SUCCESS`:
            localStorage.setItem('agencyinfo', JSON.stringify(action.payload.result.list))
            return Object.assign({}, state, { agencyinfo: action.payload.result.list });

        case `${GET_CHILDCOURSELIST}_SUCCESS`:
            return Object.assign({}, state, { childCourselist: action.payload.result });

        case `${GET_COURSECATEGORYLIST}_SUCCESS`:
            return Object.assign({}, state, { childCoursecategorylist: action.payload.result.list });
            
        case `${GET_NOTICEDETAIL}_SUCCESS`:
            return Object.assign({}, state, { noticedetail: action.payload.result.list });

        case `${GET_NOTICEINFOS}_SUCCESS`:
            return Object.assign({}, state, { noticeinfos: action.payload.result.list });

        default:
            let agency = localStorage.getItem('agencyinfo')
            let obj = { index_menu: [] }
            if ( agency ) {
                obj = JSON.parse(agency)
            }   
            return Object.assign({}, state, { agencyinfo: obj });
    }
}