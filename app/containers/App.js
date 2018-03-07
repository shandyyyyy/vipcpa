import React, { Component } from 'react';
import { Link, Route, Switch ,IndexRoute , Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../assets/css/base.less';
import '../assets/css/font.less';
import NotFound from './NotFound';
import Login from './Login';
import Register from './Register';
import Password from './Password';
import Index from './index';
import StudyPlay from '../components/studyPlay';
import Course from '../components/course';
import Room from '../components/room';
import Me from '../components/me';
import TopList from './topList';

import Product from './Product';
import ProductSearch from './Product/search';
import '../assets/js/global'

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <Route render={(params) => {
                    let { location } = params;
                    return (
                            <Switch key={location.pathname} location={location}>
                                <Route exact path="/" component={Login} />
								<Route  path="/register" component={Register} />
								<Route  path="/password" component={Password} />
                                <Route  path="/404" component={NotFound} />
                                <Route path="/index" component={Index} />
								<Route path="/topList" component={TopList} />
                                <Route exact path="/product" component={Product} />
                                <Route exact path="/search" component={ProductSearch} />
                            </Switch>
                    )
                }}>
                </Route>
            </div>
        )
    }
}