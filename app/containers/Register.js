import React, {Component} from 'react';
import antdMobile from 'antd-mobile';
const {Button, InputItem, NavBar, Icon,Toast, WhiteSpace, WingBlank} = antdMobile;
import '../assets/css/base.less';
import '../assets/css/login.less';
// import {Hash} from '../assets/js/hash';
// import {getEnv} from '../util/config';
// import {userLogin} from '../api/user';

// let prefix = getEnv();

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			loading: false
		};
	}

	onLeftClick = () => {
		this.props.history.push('/');
	};
	handleSubmit = (e) => {
		if (!this.state.userName || !this.state.password) {
			return;
		}
		// 登录
		this.setState({
			loading: true
		});
		GLive.User.loginAsGaodunUser(
			this.state.userName,
			this.state.password,
			(function (that) {
				return function (resp) {
					console.log(resp);
					that.props.history.push({
						pathname: '/product'
					});
				}

			})(this)
		)
	};

	handleUserNameChange = value => {
		this.setState({
			userName: value
		});
	};

	handlePasswordChange = value => {
		this.setState({
			password: value
		});
	};
	handleGetMessage = () => {
		Toast.success('发送成功', 1);
	};
	handleRegister = (e) => {
		this.props.history.push({
			pathname: '/password'
		});
	};

	render() {
		return (
			<div className="register">
				<NavBar
					mode="light"
					className="navbar"
					leftContent={<Icon type="left"></Icon>}
					onLeftClick={this.onLeftClick}>
				</NavBar>
				<div className="login">
					<div className="title">注册新账号</div>
					<InputItem
						type="text"
						name="userName"
						clear
						placeholder="请输入手机号"
						extra="发送验证码"
						onExtraClick={this.handleGetMessage}
						className="name"
						value={this.state.userName}
						onChange={this.handleUserNameChange}
					>
						{/*<i className="icon icon_name"></i>*/}
						手机号
					</InputItem>
					<InputItem
						type="password"
						name="password"
						clear
						placeholder="请输入验证码"
						className="password"
						value={this.state.password}
						onChange={this.handlePasswordChange}
					>
						{/*<i className="icon icon_password"></i>*/}
						验证码</InputItem>
					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>
					<Button type="primary" className="login_btn" onClick={this.handleRegister}
							loading={this.state.loading}
							disabled={this.state.loading}>注册</Button>
				</div>
			</div>
		);
	}
}