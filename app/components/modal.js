import React from 'react';
import {
	WingBlank,
	WhiteSpace,
	Grid,
	Flex,
	NavBar,
	Icon,
	Button,
	Modal,
	Toast,
	List,
	Radio,
	Checkbox
} from 'antd-mobile';
import '../assets/css/studyPlan.less';
const alert = Modal.alert;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions/modal';

@connect(
	(state) => { return { state } },
	(dispatch) => bindActionCreators({ ...actions }, dispatch)
)

class MyModal extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
            pageHeight: document.documentElement.clientHeight - 20,
			visible: false
		};
	}
	onClose = () => {
		this.props.changeModalState(false);
	};
	render(){
		return (
			<Modal
				popup
				visible={this.props.state.changeModalReducer.show}
				onClose={()=>this.onClose()}
				animationType="slide-up"
				className="studyPlan_modal"
			>
				<div className="modal_content" style={{maxHeight: this.state.pageHeight, overflowY: 'auto'}}>
					<div >
						<div className="modal_title">学习计时</div>
						<div className="modal_body">
							<WhiteSpace size="lg"/>
							<WhiteSpace size="lg"/>
							<h3>我们给您制定的自由和番茄钟学习方式,
								请选择一种</h3>
							<WhiteSpace size="lg"/>
							<WhiteSpace size="lg"/>
							<Button type="default" onClick={() => this.props.startPlan('tomato')}>番茄钟模式</Button>
							<WhiteSpace size="lg"/>
							<Button type="default" onClick={() => this.props.startPlan('free')}>自由模式</Button>
							<WhiteSpace size="lg"/>
							<WhiteSpace size="lg"/>
						</div>
					</div>

					<div className="info">
						<WingBlank>
							<h4>番茄钟模式？</h4>
							<p>番茄工作法是简单易行的时间管理方法，是由弗朗西斯科·西里洛于1992年创立的一种相对于GTD更微观的时间管理方法。</p>
							<WhiteSpace size="lg"/>
							<p>使用番茄工作法，选择一个待完成的任务，将番茄时间设为25分钟，专注工作，中途不允许做任何与该任务无关的事，直到番茄时钟响起，然后在纸上画一个X短暂休息一下（5分钟就行），每4个番茄时段多休息一会儿。</p>
							<WhiteSpace size="lg"/>
							<p>番茄工作法极大地提高了工作的效率，还会有意想不到的成就感。</p>
							<WhiteSpace size="lg"/>
						</WingBlank>
					</div>
				</div>
			</Modal>

		)
	}
}


export default MyModal;