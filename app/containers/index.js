import React from 'react';
import {Link, Route, Switch, IndexRoute, Redirect} from 'react-router-dom';
import antdMobile from 'antd-mobile';
const {WingBlank, WhiteSpace, Flex, NavBar, Icon, Button, TabBar, ListView} = antdMobile;

import '../assets/css/tabBar.less';
import StudyPlan from '../components/studyPlan';
import Room from '../components/room';
import Course from '../components/course';
import Me from '../components/me';

export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'studyPlan'
		};
	}

	componentDidMount() {

	}

	onTabPress = (name) => {
		let {location} = this.props;
		if(`/index/${name}` !== location.pathname){
			if(name === 'studyPlan'){
                this.props.history.push({
                    pathname: `/index`
                });
                return;
			}
			this.props.history.push({
				pathname: `/index/${name}`
			})
		}
	};
	render() {
		let {location} = this.props;
		return (
			<div className="tabBar_wrap">
				<TabBar
					unselectedTintColor="#949494"
					tintColor="#ea3e3f"
					barTintColor="white"
				>
					<TabBar.Item
						title="学习计划"
						key="studyPlan"
						icon={<div className="tabIcon playIcon"/>}
						selectedIcon={<div className="tabIcon playSelectedIcon"/>}
						selected={location.pathname === '/index'}
						onPress={() => {
							this.onTabPress('studyPlan')
						}}
					>
						<Route exact path='/index' component={StudyPlan}/>
					</TabBar.Item>
					<TabBar.Item
						title="自习室"
						key="room"
						icon={<div className="tabIcon roomIcon"/>}
						selectedIcon={<div className="tabIcon roomSelectedIcon"/>}
						// selected={location.pathname === '/index/room'}
						selected={location.pathname.indexOf('/room') > -1 ? true: false}
						onPress={() => {
							this.onTabPress('room')
						}}
					>
						<Route  path='/index/room' component={Room}/>
					</TabBar.Item>
					<TabBar.Item
						title="课程"
						key="course"
						icon={<div className="tabIcon courseIcon"/>}
						selectedIcon={<div className="tabIcon courseSelectedIcon"/>}
						// selected={location.pathname === '/index/course'}
                        selected={location.pathname.indexOf('/course') > -1 ? true: false}
						onPress={() => {
							this.onTabPress('course')
						}}

					>
						<Route  path='/index/course' component={Course}/>
					</TabBar.Item>
					<TabBar.Item
						title="我的"
						key="me"
						icon={<div className="tabIcon myIcon"/>}
						selectedIcon={<div className="tabIcon mySelectedIcon"/>}
						selected={location.pathname === '/index/me'}
						onPress={() => {
							this.onTabPress('me')
						}}
					>
						<Route path='/index/me' component={Me}/>
					</TabBar.Item>
				</TabBar>
			</div>
		);
	}
}