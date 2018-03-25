import React from 'react';
import {Route} from 'react-router-dom';
import antdMobile from 'antd-mobile';

const {
    WingBlank,
    WhiteSpace,
    Icon,
    List,
    Button,
    Flex,
    Toast
} = antdMobile;
import '../../assets/css/base.less';
import '../../assets/css/report.less';
import TopListPage from '../../containers/TopListPage';

const Item = List.Item;
const Brief = Item.Brief;

export default class TopList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: gaodun_callback.Data.me.id,
            issue: []
        };
    }

    componentWillMount() {
    }

    topIssue = () => {
        this.props.history.push({
            pathname: "/room/topListPage"
        })
    };
    addIssue = () => {
        this.props.history.push({
            pathname: "/room/addIssue"
        })
    };

    render() {
        const {issue} = this.state;
        return (
            <div className="topList">
                <WingBlank>
                    <div className="today_issue_play">
                        <WhiteSpace size="lg"/>
                        <h4>今日答疑计划</h4>
                        <p><Icon type="check"></Icon> 坐阵科目：<span>会计</span></p>
                        <p><Icon type="check"></Icon> 坐阵时间：<span>16:00～16:30</span></p>
                        <Button type="warning" inline className="issue_btn"
                                onClick={() => this.addIssue()}>我要提问</Button>
                        <WhiteSpace size="lg"/>
                    </div>
                    <WhiteSpace size="lg"/>
                    <Flex className="topIssue">
                        <Flex.Item>精华列表</Flex.Item>
                        <Flex.Item className="my_arrow my_all"
                                   onClick={() => this.topIssue()}>阅读全部</Flex.Item>
                        <Flex.Item className="my_arrow" onTouchStart={() => this.topIssue()}><Icon
                            type="right" size="md"/></Flex.Item>
                    </Flex>
                    <WhiteSpace size="lg"/>
                </WingBlank>

                <TopListPage size="2"/>

            </div>

        );
    }
}