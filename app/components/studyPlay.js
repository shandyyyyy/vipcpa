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
	Radio,
	Checkbox
} from 'antd-mobile';
import '../assets/css/studyPlay.less';
// import  '../util/util';
// import {formatDate, formatMinuteTime} from "../util/util";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from 'actions/modal';
import MyModal from './modal';

const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
const RadioItem = Radio.RadioItem;

@connect(
	(state) => {
		return {state}
	},
	(dispatch) => bindActionCreators({...actions}, dispatch)
)

export default class StudyPlay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: '学习计划',
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
		const extra = (selected) => (
			<Icon type="check-circle" color={selected ? "#36ca78" : "#eee"}/>
		);
		return (
			<div className="studyPlay">
				<WingBlank>
					<WhiteSpace size="lg"/>
					<Flex className="title">
						<Flex.Item className="left">学习计划</Flex.Item>
						<Flex.Item className="right">
							<p>2018年考试倒计时</p>
							<p className="time">157<span>天</span></p>
						</Flex.Item>
					</Flex>
					<WhiteSpace size="lg"/>
				</WingBlank>
				<section>
					时间，抓起来是黄金，抓不起是流水。
				</section>
				<div className="today_date">
					<WingBlank>
						<WhiteSpace size="lg"/>
						<Flex>
							<Flex.Item className="my_arrow" onClick={() => this.queryList('prev')}><Icon
								type="left"/></Flex.Item>
							<Flex.Item>
								<p>3 个任务</p>
								<p> {this.state.todayShow
									? '今天 ' + this.state.today
									: this.state.currentDay
								}
								</p>
							</Flex.Item>
							{/*<Flex.Item className="my_ellipsis">*/}
							{/*<Icon type="search"/>*/}
							{/*<Icon type="ellipsis"/>*/}
							{/*</Flex.Item>*/}
							{this.state.todayShow
								? ''
								:<Flex.Item className="my_arrow" onClick={() => this.queryList('today')}>今天</Flex.Item>
							}
							<Flex.Item className="my_arrow" onClick={() => this.queryList('next')}><Icon type="right"/></Flex.Item>
						</Flex>
						<WhiteSpace size="lg"/>
					</WingBlank>
				</div>
				<WingBlank>
					<WhiteSpace size="lg"/>
					<Button type="warning" className="startPlay"
							onClick={() => this.showModal()}>{this.state.time > 0 ? this.state.time : "开始学习计时"}</Button>
					<WhiteSpace size="lg"/>
					{/*//modal*/}
					<MyModal  startPlay={this.startPlay}/>
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
								<CheckboxItem key={i.id} checked={i.finished === true}
											  onChange={() => this.onChange(i)}/>
							</Flex.Item>
						</Flex>
					))}
				</List>
			</div>
		);
	}
}