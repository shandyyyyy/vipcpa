import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import antdMobile from 'antd-mobile';

const {
    WingBlank,
    WhiteSpace,
    NavBar,
    Icon,
    ListView,
    Toast
} = antdMobile;
import '../../assets/css/base.less';
import '../../assets/css/me.less';
import '../../assets/css/issueList.less';

function MyBody(props) {
    return (
        <div className="my_body listScroll">
            <span style={{display: 'none'}}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

export default class Issue extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            isLoading: true,
            userID: gaodun_callback.Data.me.id,
            issue: [],
            pageHeight: document.documentElement.clientHeight - 45,
        };
    }

    componentWillMount() {
        gaodun_callback.Class.query((resp) => {
            if (resp.status === 0) {
                let classList = resp.result.classList;
                let cpaClass = [];
                classList.forEach((item, index) => {
                    if (item.groupID === 27) {
                        cpaClass.push(item);
                    }
                });
                this.setState({
                    data: cpaClass
                }, () => {
                    let questionTotal = [];
                    this.state.data.forEach((item, index) => {
                        this.getIssue(item,index, questionTotal);
                    })
                });
            } else {
                Toast.fail("出错了", 1)
            }
        });
    }

    getIssue = (item, index,questionTotal) => {
        gaodun_callback.Class.issueGet(item.id, (resp) => {
            if (resp.status === 0) {
                let questions = [];

                let finished = resp.result.finished;
                let unfinished = resp.result.unfinished;
                questions = finished.concat(unfinished);
                // console.log(questions);
                for (let i = 0; i < questions.length; i++) {
                    questions[i].time = gaodun_callback.Methods.formatTime(new Date(questions[i].questionUpdateTime));
                    questions[i].subKeyStr = gaodun_callback.Methods.formatTime(new Date(questions[i].subKey * 1000));
                    questions[i].user = (questions[i].questionUpdater === parseInt(this.state.userID)) ? "me" : "other";
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
                    questionTotal.push(questions[i]);
                }
                questionTotal.sort(function (a, b) {
                    return a.questionUpdateTime - b.questionUpdateTime;
                });
                if(index === this.state.data.length-1){
                    let myQuestion = [];
                    questionTotal.forEach(item=>{
                        if(item.user === 'me'){
                            myQuestion.push(item);
                        }
                    });
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(myQuestion),
                        isLoading: false,
                        hasMore: false,
                        issue: myQuestion,
                    });
                }

            } else {
                Toast.info(resp.info, 1);
            }
        })
    };

    componentDidMount() {

    }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            console.log('reach end', event);
            this.setState({isLoading: false});
            return;
        }
    };

    onLeftClick = () => {
        this.props.history.push('/index/me');
    };

    render() {
        const {issue} = this.state;
        let index = issue.length - 1;
        const row = () => {
            if (index < 0) {
                index = issue.length - 1;
            }
            const obj = issue[index--];
            if (issue.length === 0) {
                console.log("数组长度为0");
                return;
            }

            return (
                <div key={obj.id} className="top_list">
                    <WingBlank>
                        <WhiteSpace size="lg"/>
                        <div className="title">
                            <div className="title_right">
                                <div className="nickname">我</div>
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
                                    <img src={item.body} alt="" key={item.body} /> :
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
                    </WingBlank>
                </div>
            );
        };
        return (
            <div className="issue">
                <NavBar
                    mode="dark"
                    className="navbar"
                    leftContent={<Icon type="cross"></Icon>}
                    onLeftClick={this.onLeftClick}>
                    我的答疑
                </NavBar>
                <div style={{height: '45px'}}></div>
                {/*<IssueList style={{height:this.state.pageHeight+'px'}}/>*/}
                <div className="issue_list" ref={el => this.lv = el}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{padding: 20, textAlign: 'center'}}>
                            {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>)}
                        renderBodyComponent={() => <MyBody/>}
                        renderRow={row}
                        style={{
                            height: this.state.pageHeight,
                            overflow: 'auto',
                        }}
                        pageSize={10}
                        onScroll={() => {
                            console.log('scroll');
                        }}
                        initialListSize={10}
                        scrollRenderAheadDistance={50}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={20}
                    />
                </div>
            </div>
        );
    }
}
