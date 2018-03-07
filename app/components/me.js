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


@connect(
	(state) => {
		return {state}
	},
	(dispatch) => bindActionCreators({...actions}, dispatch)
)

export default class Me extends React.Component {
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
	showModal = () => {
		// e.preventDefault(); // 修复 Android 上点击穿透
		if (this.state.time !== 0) {
			this.setState({
				time: 0,
				count: 0
			});
			clearInterval(this.state.setIntervalTime);
		} else {
			this.props.changeModalState(true);
		}
	};
	startPlay = (key) => {
		this.props.changeModalState(false);
		this.setState({
			count: ++this.state.count
		});
		this.state.setIntervalTime = setInterval(function (that) {
			my_alert(that);
		}, 1000, this);

		const my_alert = (that) => {
			let time = ++that.state.time;
			if (key === 'tomato' && time >= 3 * that.state.count) {
				clearInterval(that.state.setIntervalTime);
				alert('太棒了', <div>已收获一个番茄<p>是否继续休息下继续学习</p></div>, [
					{
						text: '休息5分钟', onPress: () => {
							console.log("休息5分钟");
						}
					},
					{
						text: '继续学习', onPress: () => {
							++that.state.count;
							that.state.setIntervalTime = setInterval(function (that) {
								my_alert(that);
							}, 1000, that);
						}
					},
				]);
			}
			that.setState({
				time: time
			});
		};
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

				<List className="list_play">
					{this.state.data.map(i => (
						<Flex key={i.id}>
							<Flex.Item>
								<Item
									key={i.id}
									thumb={i.thumb}
									multipleLine
									onClick={() => this.handleClick(i)}>
									{i.label}
									<Brief>{i.brief}</Brief>
								</Item>
							</Flex.Item>
							<Flex.Item className="my_checkbox">
								jjj
							</Flex.Item>
						</Flex>
					))}
				</List>
			</div>
		);
	}
}