import React from 'react';
import {
	WingBlank,
	WhiteSpace,
	NavBar,
	Icon,
} from 'antd-mobile';
import '../assets/css/room.less';

export default class TopList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
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

	onLeftClick = () => {
		this.props.history.push('/index/room');
	};
	render() {
		return (
			<div className="room">
				<NavBar
					mode="dark"
					className="navbar"
					leftContent={<Icon type="cross"></Icon>}
					onLeftClick={this.onLeftClick}>
				</NavBar>
				<WingBlank>
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
		);
	}
}