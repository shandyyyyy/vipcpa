import React from 'react';
import {
	WingBlank,
	WhiteSpace,
	Grid,
	Flex,
	NavBar,
	Icon,
	Button,
	Toast,
	Modal,
	List,
	Tabs,
	Card,
	Tag,
} from 'antd-mobile';
import '../assets/css/room.less';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from 'actions/modal';
import MyModal from './modal';


const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
const tabs = [
	{title: "精华提问"},
	{title: "我的提问"},
	{title: "战报"},
	{title: "互动"},
];

@connect(
	(state) => {
		return {state}
	},
	(dispatch) => bindActionCreators({...actions}, dispatch)
)

export default class Room extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: '自习室',
			today: new Date().getMonth() + 1 + '月' + new Date().getDate() + '日', //今天的日期
			todayShow: true, //显示今天任务
			currentDay: new Date().getMonth() + 1 + '月' + new Date().getDate() + '日', //当前查询日期
			modal: false,
			pageHeight: document.documentElement.clientHeight - 20,
			tomato: false,
			free: false,
			time: 0,
			count: 0,
			setIntervalTime: null,
			data: [
				{
					id: 1,
					finished: false,
					label: 'basketball basketballbasketballbasketballbasketball',
					brief: 'details',
					extra: false,
					thumb: '//zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
				},
				{
					id: 2,
					finished: false,
					label: 'football',
					brief: 'details',
					extra: true,
					thumb: '//zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
				},
				{
					id: 3,
					finished: true,
					label: 'football',
					brief: 'details',
					extra: true,
					thumb: '//zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'
				},
			]
		};
	}

	componentWillMount() {
		console.log("componentWillMount");
	}

	componentDidMount() {
		console.log("componentDidMount");
	}

	onChange = (i) => {
		this.state.data.forEach((item) => {
			if (item.id === i.id) {
				item.finished = !i.finished;
				item.extra = !i.extra;
			}
		});
		this.setState({
			data: this.state.data
		})
	};
	handleClick = (i) => {
		this.state.data.forEach((item) => {
			if (item.id === i.id) {
				Toast.success("showModal", 1);
			}
		});
	};
	topIssue = () => {

		console.log(this.props.history);
		this.props.history.push({
			pathname: "/topList"
		})
	};

	render() {
		return (
			<div className="room">
				<WingBlank>
					<WhiteSpace size="lg"/>
					<Flex className="title">
						<Flex.Item className="left">自习室</Flex.Item>
						<Flex.Item className="right">
							<p>在线人数</p>
							<p className="time">157</p>
						</Flex.Item>
						<Flex.Item className="right">
							<p>同班在线</p>
							<p className="time">17</p>
						</Flex.Item>
					</Flex>
					<WhiteSpace size="lg"/>
				</WingBlank>
				<Tabs tabs={tabs}
					  initialPage={0}
					  tabBarActiveTextColor="#008489"
					  onChange={(tab, index) => {
						  console.log('onChange', index, tab);
					  }}
					  onTabClick={(tab, index) => {
						  console.log('onTabClick', index, tab);
					  }}
				>

					<div style={{height: '500px', backgroundColor: '#fff'}}>
						<WingBlank>
							<div className="today_issue_play">
								<WhiteSpace size="lg"/>
								<h4>今日答疑计划</h4>
								<p><Icon type="check"></Icon> 坐阵科目：<span>会计</span></p>
								<p><Icon type="check"></Icon> 坐阵时间：<span>16:00～16:30</span></p>
								<WhiteSpace size="lg"/>
							</div>
							<WhiteSpace size="lg"/>
							<Flex className="topIssue">
								<Flex.Item>精华列表</Flex.Item>
								<Flex.Item className="my_arrow my_all"
										   onTouchStart={() => this.topIssue()}>阅读全部</Flex.Item>
								<Flex.Item className="my_arrow" onTouchStart={() => this.topIssue()}><Icon
									type="right" size="md"/></Flex.Item>
							</Flex>
							<WhiteSpace size="lg"/>
							{this.state.data.map(i => (
								<div className="top_list" key={i.id}>
									<WhiteSpace size="lg"/>
									<div className="title">
										<img src="" alt=""/>
										<div className="title_right">
											<div className="nickname">nickname</div>
											<div className="time">time <i>审计</i></div>
										</div>
									</div>
									<WhiteSpace size="lg"/>
									<div className="body">
										老师，我想问一下，当集团的会计在给整个集团编报表的时候，需要考虑税费吗？还要去税务局交税吗？谢谢老师
									</div>
									<WhiteSpace size="lg"/>
									<div className="answer">
										<span>老师：</span>
										同学，你好！不需要！考虑递延的就好！
									</div>
									<WhiteSpace size="lg"/>
								</div>
							))}
						</WingBlank>
					</div>
					<div style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '150px',
						backgroundColor: '#fff'
					}}>
						Content of second tab
					</div>
					<div style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '150px',
						backgroundColor: '#fff'
					}}>
						Content of third tab
					</div>
					<div style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '150px',
						backgroundColor: '#fff'
					}}>
						Content of third tab
					</div>
				</Tabs>
			</div>
		);
	}
}