import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import {
    WingBlank,
    WhiteSpace,
    Flex,
    NavBar,
    Icon,
    Button,
    Toast,
    ActivityIndicator
} from 'antd-mobile';
import '../../assets/css/base.less';
import '../../assets/css/me.less';
import IssueList from '../../components/issueList';


export default class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            note: [],
            pageHeight: document.documentElement.clientHeight - 45,
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
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
                });
                let arr = [];
                this.state.data.forEach(item => {
                    gaodun_callback.Class.getNote(item.id, (resp) => {
                        if (resp.status === 0) {
                            let list = resp.result.note;

                            list.forEach(list => {
                                list.formatDate = gaodun_callback.Methods.formatTime(list.updateTime);
                                arr.push(list);
                            });
                            arr = arr.sort(function (a, b) {
                                return b.updateTime - a.updateTime;
                            });
                            this.setState({
                                note: arr,
                                loading: false
                            })
                            console.log(this.state);
                        } else {
                            Toast.info(resp.info, 1);
                        }
                    })
                })
            } else {
                Toast.fail("出错了", 1)
            }
        });
    }

    onLeftClick = () => {
        this.props.history.push('/index/me');
    };

    render() {
        return (
            <div className="note">
                <NavBar
                    mode="dark"
                    className="navbar"
                    leftContent={<Icon type="cross"></Icon>}
                    onLeftClick={this.onLeftClick}>
                    我的笔记
                </NavBar>
                <div style={{height: '35px'}}></div>
                <div className="loading-example">
                    <div className="align">
                        <ActivityIndicator size="large" animating={this.state.loading}/>
                    </div>
                </div>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                {this.state.note.map(item => (
                    <div key={item.id} className="top_list">
                        <WingBlank>
                            <WhiteSpace size="lg"/>
                            <div className="body">{item.body}</div>
                            <WhiteSpace size="lg"/>
                            <div className="answer">
                                <span>时间：</span>
                                {item.formatDate}
                            </div>
                            <WhiteSpace size="lg"/>
                            <div className="line" style={{borderBottom: '1px solid #ddd', height: '1px'}}></div>
                        </WingBlank>
                    </div>
                ))}

            </div>
        );
    }
}
