import React from 'react';
import ReactDOM from 'react-dom';
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
        this.getIssue();
    }

    getIssue() {
        let roomID = gaodun_callback.Data.roomID;
        gaodun_callback.Class.issueGet(roomID, (resp) => {
            if (resp.status === 0) {
                let questions = [];

                let finished = resp.result.finished;
                let unfinished = resp.result.unfinished;
                questions = finished.concat(unfinished);
                for (let i = 0; i < questions.length; i++) {
                    questions[i].time = gaodun_callback.Methods.formatTime(new Date(questions[i].questionUpdateTime));
                    questions[i].subKeyStr = gaodun_callback.Methods.formatTime(new Date(questions[i].subKey * 1000));
                    questions[i].user = (questions[i].questionUpdater === parseInt(this.state.userID)) ? "我" : "来自高顿同学";
                    questions[i].subject = gaodun_callback.Data.subjectMap[questions[i].subKey];
                    //数组
                    let body = decodeURIComponent(questions[i].questionBody);
                    let arrs = body.split("\\n");
                    let q_arrs = [];
                    for (let j = 0; j < arrs.length; j++) {
                        let map = {};
                        if (arrs[j].indexOf("data:image/png") > -1 || arrs[j].indexOf("//") > -1) {
                            map.img = true;
                        } else {
                            map.img = false;
                        }
                        map.body = arrs[j];
                        q_arrs.push(map);
                    }
                    questions[i].q_arr = q_arrs;
                }
                questions.sort(function (a, b) {
                    return a.questionUpdateTime - b.questionUpdateTime;
                });
                this.setState({
                    isLoading: true,
                    hasMore: false,
                    issue: questions,
                });
            } else {
                Toast.info(resp.info, 1);
            }
        })
    }

    topIssue = () => {
        // console.log(this.props.history);
        this.props.history.push({
            pathname: "/room/topListPage"
        })
    };
    addIssue = () => {
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
                        <Button type="warning" inline className="issue_btn"
                                onClick={() => this.addIssue()}>我要提问</Button>
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
                    {this.state.issue.map(obj => (
                        <div className="top_list" key={obj.id}>
                            <WhiteSpace size="lg"/>
                            <div className="title">
                                {/*<img src="" alt=""/>*/}
                                <div className="title_right">
                                    <div className="nickname">{obj.user}</div>
                                    <div className="time">{obj.time}<i>{obj.subject}</i>
                                        {obj.answerBody ? '' :
                                            <span className="status">等待处理</span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <WhiteSpace size="lg"/>
                            <div className="body">
                                {obj.q_arr.map((item, index) => (
                                    item.img ?
                                        <img src={item.body} alt="" key={item.body}/> :
                                        <div key={item.body}>{item.body}</div>
                                ))}
                            </div>
                            <WhiteSpace size="lg"/>
                            {obj.answerBody ?
                                <div className="answer">
                                    <span>老师：</span>
                                    {obj.answerBody}
                                    <WhiteSpace size="lg"/>
                                </div>

                                : ''}
                            <div className="line"></div>
                        </div>
                    ))}
                </WingBlank>
            </div>

        );
    }
}