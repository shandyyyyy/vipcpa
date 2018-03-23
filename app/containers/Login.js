import React, {Component} from 'react';
import antdMobile from 'antd-mobile';
const {Button, List, InputItem, Icon, WhiteSpace, WingBlank, Toast} = antdMobile;
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
			type: 'password',
			loading: false
		};
	};


	handleSubmit = (e) => {
		if (!this.state.userName || !this.state.password) {
            Toast.fail('用户名或者密码不能为空',1);
			return;
		}
		// 登录
		this.setState({
			loading: true
		});
		gaodun_callback.User.loginAsGaodunUser(
			this.state.userName,
			this.state.password,
			(function (that) {
				return function (resp) {
					console.log(resp);
					that.props.history.push({
						pathname: '/index'
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
	handleShowPwd = () => {
		// let type = this.state.type === 'password'?'text':'password';
		this.setState({
			type:this.state.type === 'password'?'text':'password'
		})
	};
	handleRegister = (e) => {
		this.props.history.push({
			pathname: '/register'
		});
	};

	render() {
		return (
			<div className="login">
				<div className="title">登录</div>
				{/*<List >*/}
				<InputItem
					type="text"
					name="userName"
					clear
					placeholder="请输入手机号或邮箱"
					className="name"
					value={this.state.userName}
					onChange={this.handleUserNameChange}
				>
					{/*<i className="iconfont icon-iphone"></i>*/}
					帐号</InputItem>
				<InputItem
					type={this.state.type}
					name="password"
					clear
					placeholder="请输入密码"
					extra={<i className="iconfont icon-eye"></i>}
					onExtraClick={this.handleShowPwd}
					className="password"
					value={this.state.password}
					onChange={this.handlePasswordChange}
				>
					{/*<i className="iconfont icon-lock"></i>*/}
					密码</InputItem>
				{/*</List>*/}
				<WhiteSpace size="lg" />
				<span className="forgot">忘记密码</span>
				<WhiteSpace size="lg" />
				<Button type="warning" className="login_btn" onClick={this.handleSubmit} loading={this.state.loading}
						disabled={this.state.loading}>登录</Button>
				<WhiteSpace/>
				<WhiteSpace/>
				<Button type="ghost" className="register_btn"  onClick={this.handleRegister}>注册新账号</Button>
				<WhiteSpace/>
			</div>
		);
	}
}