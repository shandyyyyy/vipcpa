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
	Tabs
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
	{ title: "First Tab" },
	{ title: "Second Tab" },
	{ title: "Third Tab" },
];

@connect(
	(state) => {
		return {state}
	},
	(dispatch) => bindActionCreators({...actions}, dispatch)
)

export default class Course extends React.Component {
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
	queryList = (key) => {
		console.log(key);
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
					  initialPage={1}
					  onChange={(tab, index) => { console.log('onChange', index, tab); }}
					  onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
				>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
						Content of first tab
					</div>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
						Content of second tab
					</div>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
						Content of third tab
					</div>
				</Tabs>
			</div>
		);
	}
}