import React from 'react';
import ReactDOM from 'react-dom';
import antdMobile from 'antd-mobile';

const {
    WingBlank,
    WhiteSpace,
    NavBar,
    Icon,
    ListView,
    Toast
} = antdMobile;
import '../assets/css/issueList.less';

const NUM_ROWS = 20;
let pageIndex = 0;

function MyBody(props) {
    return (
        <WingBlank>
            <div className="my_body listScroll">
                <span style={{display: 'none'}}>you can custom body wrap element</span>
                {props.children}
            </div>
        </WingBlank>
    );
}

export default class TopListPage extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            isLoading: true,
            issue: [],
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);
        this.getIssue();
        // const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // // simulate initial Ajax
        // setTimeout(() => {
        //     this.rData = data;
        //     this.setState({
        //         dataSource: this.state.dataSource.cloneWithRows(data),
        //         isLoading: false,
        //         height: hei,
        //     });
        // }, 600);
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
            return;
        }
        console.log('reach end', event);
        this.setState({isLoading: true});

        setTimeout(() => {
            this.rData = data.concat(data);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    };

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
                    questions[i].user = (questions[i].questionUpdater === parseInt(this.state.userID)) ? "我的提问" : "来自高顿同学的提问";
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
                    dataSource: this.state.dataSource.cloneWithRows(questions),
                    hasMore: false,
                    issue: questions,
                });
            } else {
                Toast.info(resp.info, 1);
            }
        })
    }

    onLeftClick = () => {
        this.props.history.push('/index/room');
    };

    render() {
        const {issue} = this.state;
        let index = 0;
        const row = () => {
            if (issue.length === 0) {
                console.log("数组长度为0");
            }
            const obj = issue[index++];
            // console.log(obj);
            return (
                <div key={obj.id} className="top_list">
                    <WhiteSpace/>
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
                    <WhiteSpace/>
                    <div className="body">
                        {obj.q_arr.map(item => (
                            item.img ?
                                <img src={item.body} alt="" key={item.body}/> :
                                item.body
                        ))}
                    </div>
                    <WhiteSpace/>
                    {obj.answerBody ?
                        <div className="answer">
                            <span>老师：</span>
                            {obj.answerBody}
                            <WhiteSpace size="lg"/>
                        </div>

                        : ''}
                    <div className="line"></div>
                </div>
            );
        };
        return (
            <div className="room">
                <NavBar
                    mode="dark"
                    className="navbar"
                    leftContent={<Icon type="cross"></Icon>}
                    onLeftClick={this.onLeftClick}>
                    精华列表
                </NavBar>
                <div className="topList_box">
                </div>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    // renderHeader={() => <span>header</span>}
                    renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderBodyComponent={() => <MyBody/>}
                    renderRow={row}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    pageSize={4}
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