import React from 'react'
import {
    Route,
    IndexRoute,
    hashHistory
} from 'react-router'
// 引入各页面级组件
import App from './containers/App'

import Index from './containers/Index'
import Course from './containers/Course/'
import CourseDetail from './containers/Course/detail'
import Member from './containers/Member/'
import Activetrain from "./containers/Member/Activetrain";
import Courselearn from "./containers/Member/Courselearn";
import Selectcourse from "./containers/Member/Selectcourse";
import Finalexam from "./containers/Member/Finalexam";
import Personinfo from "./containers/Member/Personinfo";
import Exercise from './containers/Course/Exam/Exercise';
import Examine from './containers/Course/Exam/Examine';
import Payfor from './containers/Member/Payfor';
import Help from './containers/Help'
import GoBack from './containers/GoBack'

import About from './containers/About/About'
import Collaborate from './containers/About/Collaborate'
import Contact from './containers/About/Contact'

import NotFound from './containers/NotFound'

export const routeConfig = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Index },
        onChange: (prevState, nextState) => {
            window.scrollTo(0, 0)
        },
        childRoutes: [
            { path: 'course', component: Course },
            { path: 'course/detail/:id', component: CourseDetail },
            { path: 'course/exam/exercise', component: Exercise },
            { path: 'course/exam/examine', component: Examine },
            { path: 'help/:id', component: Help },
            { path: 'about', component: About },
            { path: 'collaborate', component: Collaborate },
            { path: 'contact', component: Contact },
            
        ]
    },
    {
         path: '/goback', component: GoBack
    },
    {
        path: '/member',
        component: Member,
        indexRoute: { component: Member },
        onChange: (prevState, nextState) => {
            window.scrollTo(0, 500)
        },
        childRoutes: [
            { path: 'activetrain', component: Activetrain },
            { path: 'courselearn', component: Courselearn },
            { path: 'selectcourse', component: Selectcourse },
            { path: 'finalexam', component: Finalexam },
            { path: 'personinfo', component: Personinfo },
            { path: 'payfor', component: Payfor }
        ]
    },
    {
        path: '*',
        component: NotFound
    }
]
