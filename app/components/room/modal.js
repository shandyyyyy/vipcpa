import React from 'react';
import antdMobile from 'antd-mobile';
const {
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
} = antdMobile;
import '../../assets/css/studyPlan.less';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions/modal';

@connect(
    (state) => { return { state } },
    (dispatch) => bindActionCreators({ ...actions }, dispatch)
)

export default class ReportModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
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
                className="report_modal"
            >
                <div className="modal_content" style={{maxHeight: this.state.pageHeight, overflowY: 'auto'}}>
                    <WingBlank>
                        <div className="modal_title">学习计时</div>
                        <div className="modal_body">
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                            <h3>我们给您制定的自由和番茄钟学习方式,
                                请选择一种</h3>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                        </div>
                    </WingBlank>

                    <div className="info">
                        <WingBlank>
                            list
                        </WingBlank>
                    </div>
                </div>
            </Modal>

        )
    }
}