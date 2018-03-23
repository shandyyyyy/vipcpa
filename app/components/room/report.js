import React from 'react';
import ReactDOM from 'react-dom';
import antdMobile from 'antd-mobile';
const {
    WingBlank,
    WhiteSpace,
    Icon,
    List,
    Modal,
    Flex
} = antdMobile;
import '../../assets/css/base.less';
import '../../assets/css/report.less';
import ReportModal from './modal';

const Item = List.Item;
const Brief = Item.Brief;

export default class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageHeight: document.documentElement.clientHeight - 40,
            modal: false,
            title: "英雄榜",
            data: [
                {
                    id: 1,
                    name: "dada",
                    time: "135"
                },
                {
                    id: 2,
                    name: "haha",
                    time: "10"
                }
            ],
            myData: {
                id: 2,
                name: "haha",
                time: "10"
            }
        };
    }
    componentWillMount(){

    }
    componentDidMount() {

    }

    onLeftClick = () => {
        this.props.history.push('/index/room');
    };
    showModal = (name) => {
        // e.preventDefault(); // 修复 Android 上点击穿透
        let title = "英雄榜";
        if(name === 'hero'){
           title = "英雄榜";
        }else{
            title = "班级战报";
        }
        this.setState({
            modal: true,
            title: title,
        })
    };
    onClose = () => {
        this.setState({
            modal: false
        })
    };

    render() {
        return (
            <div className="report">
                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Item
                            arrow="horizontal"
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            multipleLine
                            onClick={() => this.showModal('hero')}
                        >
                            英雄榜 <Brief>根据学习时长全网排行</Brief>
                        </Item>
                        <WhiteSpace size="lg"/>
                        <Item
                            arrow="horizontal"
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            multipleLine
                            onClick={() => this.showModal('class')}
                        >
                            班级战报 <Brief>本班内同学们的学习时长排行</Brief>
                        </Item>
                    </List>
                    {/*<ReportModal  />*/}
                    <Modal
                        popup
                        visible={this.state.modal}
                        onClose={() => this.onClose()}
                        animationType="slide-up"
                        className="report_modal"
                    >
                        <div className="modal_content" style={{
                            maxHeight: this.state.pageHeight,
                            height: this.state.pageHeight,
                            overflowY: 'auto'
                        }}>
                            <div>
                                <div className="modal_title">{this.state.title}</div>
                                <div className="modal_body">
                                    <div>每10分钟刷新数据，当日数据24:00重新计算</div>
                                    {this.state.title === "英雄榜"?
                                        <Flex key={this.state.myData.id} className="list myData">
                                            <Flex.Item className="first">
                                                {this.state.myData.id}
                                            </Flex.Item>
                                            <Flex.Item className="center first">
                                                <img src="" alt=""/>
                                                <span>{this.state.myData.name}</span>
                                                <i>Lv3</i>
                                            </Flex.Item>
                                            <Flex.Item className="first">
                                                打败了{this.state.myData.time}的同学
                                            </Flex.Item>
                                        </Flex>:""
                                    }
                                </div>
                            </div>
                            <div className="info">
                                <WhiteSpace size="lg"/>
                                {this.state.data.map((item, i) => (
                                    <Flex key={item.id} className="list">
                                        <Flex.Item>
                                            {i}
                                        </Flex.Item>
                                        <Flex.Item className="center">
                                            <img src="" alt=""/>
                                            <span>{item.name}</span>
                                            <i>Lv3</i>
                                        </Flex.Item>
                                        <Flex.Item>
                                            {item.time}分钟
                                        </Flex.Item>
                                    </Flex>
                                ))}

                            </div>
                        </div>
                    </Modal>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            </div>
        );
    }
}