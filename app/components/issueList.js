import React from 'react';
import ReactDOM from 'react-dom';
import {
    WingBlank,
    WhiteSpace,
    NavBar,
    Icon,
    ListView,
    Toast
} from 'antd-mobile';
import '../assets/css/base.less';
import '../assets/css/issueList.less';

const NUM_ROWS = 20;
let pageIndex = 0;

function MyBody(props) {
    return (
        <div className="my_body listScroll">
            <span style={{display: 'none'}}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

export default class IssueList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            isLoading: true,
            userID: 10832,
            issue: [],
            height: document.documentElement.clientHeight * 3 / 4,
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
                },()=>{
                    let questionTotal = [];
                    this.state.data.forEach(item => {
                        this.getIssue(item, questionTotal);
                    })
                });
            } else {
                Toast.fail("出错了", 1)
            }
        });
    }

    getIssue = (item, questionTotal) => {
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
                    questions[i].user = (questions[i].questionUpdater === parseInt(this.state.userID)) ? "我的提问" : "来自高顿同学的提问";
                    //数组
                    // console.log(questions[i].questionBody);
                    let arrs = questions[i].questionBody.split("\\n");
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
                setTimeout(() => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(questionTotal),
                        isLoading: true,
                        hasMore: false,
                        issue: questionTotal,
                    });
                })
            } else {
                Toast.info(resp.info, 1);
            }
        })
    };

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);
        const hei = ReactDOM.findDOMNode(this.lv).parentNode.clientHeight - 55;
        // document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax
        this.setState({
            height: hei
        });
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }
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
        this.props.history.push('/index/room');
    };

    render() {

        let index = this.state.issue.length - 1;
        const row = () => {
            if (index < 0) {
                index = this.state.issue.length - 1;
            }
            const obj = this.state.issue[index--];
            if (this.state.issue.length === 0) {
                console.log("数组长度为0");
                return;
            }

            console.log(obj);
            console.log(index);

            return (
                <div key={obj.id} className="top_list">
                    <WingBlank>
                        <WhiteSpace size="lg"/>
                        <div className="title">
                            <div className="title_right">
                                <div className="nickname">我</div>
                                <div className="time">{obj.time}<i>审计</i>
                                    {obj.answerBody ? '' :
                                        <span className="status">等待处理</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <WhiteSpace size="lg"/>
                        <div className="body">
                            {obj.q_arr.map(item => (
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
                        <div className="line" style={{borderBottom: '1px solid #ddd', height: '1px'}}></div>
                    </WingBlank>
                </div>
            );
        };
        return (
            <div className="issue_list" ref={el => this.lv = el}>
                <ListView
                    dataSource={this.state.dataSource}
                    // renderHeader={() => <span>header</span>}
                    renderFooter={() => (<div style={{padding: 20, textAlign: 'center'}}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderBodyComponent={() => <MyBody/>}
                    renderRow={row}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    pageSize={3}
                    onScroll={() => {
                        console.log('scroll');
                    }}
                    scrollRenderAheadDistance={50}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={20}
                />
            </div>

        );
    }
}