import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import {
    WingBlank,
    WhiteSpace,
    Icon,
    List,
    Button,
    Flex
} from 'antd-mobile';
import '../../assets/css/base.less';
import '../../assets/css/report.less';


const Item = List.Item;
const Brief = Item.Brief;

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
    componentWillMount(){
        // pubsub.publish('changeTabState',{
        //     index: 0,
        // });
    }

    topIssue = () => {
        // console.log(this.props.history);
        this.props.history.push({
            pathname: "/room/topListPage"
        })
    };
    addIssue = () =>{
        // console.log("addIssue");
        this.props.history.push({
            pathname: "/room/addIssue"
        })
    };
    render() {
        return (
            <div className="topList">
                <WingBlank>
                    <div className="today_issue_play">
                        <WhiteSpace size="lg"/>
                        <h4>今日答疑计划</h4>
                        <p><Icon type="check"></Icon> 坐阵科目：<span>会计</span></p>
                        <p><Icon type="check"></Icon> 坐阵时间：<span>16:00～16:30</span></p>
                        <Button type="warning" inline className="issue_btn" onClick={() => this.addIssue()}>我要提问</Button>
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
                    {/*<IssueList />*/}
                    {this.state.data.map(i => (
                        <div className="top_list" key={i.id}>
                            <WhiteSpace size="lg"/>
                            <div className="title">
                                <img src="" alt=""/>
                                <div className="title_right">
                                    <div className="nickname">nickname</div>
                                    <div className="time">time <i>审计</i> <span className="status">等待处理</span></div>
                                </div>
                            </div>
                            <WhiteSpace size="lg"/>
                            <div className="body">
                                老师，我想问一下，当集团的会计在给整个集团编报表的时候，需要考虑税费吗？还要去税务局交税吗？谢谢老师
                            </div>
                            <WhiteSpace size="lg"/>
                            {/*<div className="answer">*/}
                            {/*<span>老师：</span>*/}
                            {/*同学，你好！不需要！考虑递延的就好！*/}
                            {/*</div>*/}
                            {/*<WhiteSpace size="lg"/>*/}
                            <div className="line"></div>
                        </div>
                    ))}
                </WingBlank>
            </div>

        );
    }
}