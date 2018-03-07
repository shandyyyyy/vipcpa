import React from 'react';
import {Link, Route, Switch, IndexRoute, Redirect} from 'react-router-dom';
import {WingBlank, WhiteSpace, Flex, NavBar, Icon, Button, TabBar, ListView} from 'antd-mobile';

import '../assets/css/tabBar.less';
import StudyPlay from '../components/studyPlay';
import Room from '../components/room';
import Course from '../components/course';
import Me from '../components/me';

export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'studyPlay'
		};
	}

	componentDidMount() {

	}

	onTabPress = (name) => {
		let {location} = this.props;
		if(`/index/${name}` !== location.pathname){
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
						key="studyPlay"
						icon={<div className="tabIcon playIcon"/>}
						selectedIcon={<div className="tabIcon playSelectedIcon"/>}
						selected={location.pathname === '/index/studyPlay'}
						onPress={() => {
							this.onTabPress('studyPlay')
						}}
					>
						<Route path='/index/studyPlay' component={StudyPlay}/>
					</TabBar.Item>
					<TabBar.Item
						title="自习室"
						key="room"
						icon={<div className="tabIcon roomIcon"/>}
						selectedIcon={<div className="tabIcon roomSelectedIcon"/>}
						selected={location.pathname === '/index/room'}
						onPress={() => {
							this.onTabPress('room')
						}}
					>
						<Route path='/index/room' component={Room}/>
					</TabBar.Item>
					<TabBar.Item
						title="课程"
						key="course"
						icon={<div className="tabIcon courseIcon"/>}
						selectedIcon={<div className="tabIcon courseSelectedIcon"/>}
						selected={location.pathname === '/index/course'}
						onPress={() => {
							this.onTabPress('course')
						}}

					>
						<Route path='/index/course' component={Course}/>
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