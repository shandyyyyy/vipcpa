import React from 'react';
import ReactDOM from 'react-dom';
import antdMobile from 'antd-mobile';

const {
    WingBlank,
    WhiteSpace,
    ListView,
    Toast
} = antdMobile;
import '../../assets/css/base.less';
import '../../assets/css/issueList.less';


function MyBody(props) {
    return (
        <div className="my_body listScroll">
            <span style={{display: 'none'}}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

export default class MyIssue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userID: gaodun_callback.Data.me.id,
            roomID: gaodun_callback.Data.roomID,
            issue: []
        };
    }

    componentWillMount() {
        gaodun_callback.Group.querySubject((resp) => {
            if (resp.status === 0) {
                let subject = resp.result;
                gaodun_callback.Data.subjectMap = subject;
                gaodun_callback.Methods.saveData();
                let arr = [];
                Object.keys(subject).map(key => {
                    let obj = {};
                    obj.id = key;
                    obj.name = subject[key];
                    obj.active = '';
                    arr.push(obj);
                    this.setState({
                        subject: arr
                    }, () => {
                        this.getIssue();
                    })
                })
            } else {
                Toast.info('获取科目失败', 1);
            }
        });

    }

    componentDidMount() {

    }

    getIssue() {
        let {roomID} = this.state;
        gaodun_callback.Class.issueGet(roomID, (resp) => {
            if (resp.status === 0) {
                let questions = [];

                let finished = resp.result.finished;
                let unfinished = resp.result.unfinished;
                questions = finished.concat(unfinished);
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

    onLeftClick = () => {
        this.props.history.push('/index/room');
    };

    render() {
        const {issue} = this.state;
        return (
            <div className="issue_list" ref={el => this.lv = el}>
                {issue.map((obj, index) => (
                    obj.user === 'me' ?
                        <div key={obj.id} className="top_list">
                            <WingBlank>
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
                            </WingBlank>
                        </div>
                        : ''
                ))}
            </div>
        );
    }
}