import React from 'react';
import {Route} from 'react-router-dom';
import antdMobile from 'antd-mobile';

const {
    WingBlank,
    WhiteSpace,
    NavBar,
    Icon,
    InputItem,
    Toast,
    Button,
    ActivityIndicator
} = antdMobile;

import '../../assets/css/base.less';
import '../../assets/css/room.less';


export default class Interaction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: gaodun_callback.Data.me.id,
            message: '',
            loading: true,
            em: false,
            chat: [],
            liveTime: [{startTime: 10 * 60, duration: 90}, {startTime: 15 * 60, duration: 90}],
            nowTime: new Date().getHours() * 60 + new Date().getMinutes(),
            roomStatus: true,
            pageHeight: document.documentElement.clientHeight - 115,
        };
    }

    componentWillMount() {

    }

    componentDidMount = () => {
        // const {liveTime, nowTime, roomStatus} = this.state;
        // liveTime.forEach(item => {
        //     if (nowTime > item.startTime && nowTime < item.startTime + item.duration) {
        //         this.state.roomStatus = true;
        //     }
        // });
        // if (!this.state.roomStatus) {
        //     Toast.fail('聊天室暂未开放', 1, () => {
        //         this.setState({
        //             roomStatus: false,
        //             loading: false
        //         })
        //     });
        //     return;
        // }else{
        //     this.setState({
        //         roomStatus: true
        //     })
        // }

        // 直播SDK参数配置
        window.DWLive.init({
            userid: 'CF5928368147E4E3',
            roomid: '7CD155520E7F925E9C33DC5901307461',
            viewername: gaodun_callback.Data.me.id + '_' + '28037',
            viewertoken: localStorage.getItem('token')
        });
        this.setState({
            loading: false
        });
        //接收公聊
        (DWLive.onPublicChatMessage) = (json) => {
            console.log(json);
            const {chat} = this.state;
            let obj = JSON.parse(json);
            if (obj.userid.indexOf('_') > -1) {
                obj.gliveid = obj.userid.split('_')[1];
            }
            obj.msg = this.showEm(obj['msg'] || '');
            chat.push(obj);
            this.setState({
                chat: chat
            }, () => {
                this.refs.content.scrollTo(100, this.refs.content.scrollHeight);
            })
        };
    };
    showEm = (str) => {
        if (!$.trim(str)) {
            return '';
        }
        str = str.replace(/\</g, '&lt;');
        str = str.replace(/\>/g, '&gt;');
        str = str.replace(/\n/g, '<br/>');
        str = str.replace(/\[em_([0-9]*)\]/g, '//view.csslcloud.net/img/em/$1.gif//');
        str = str.replace(/\[em2_([0-9]*)\]/g, '//view.csslcloud.net/img/em2/$1.png//');

        return str.split("//");
    };
    chatSend = () => {
        const {message} = this.state;
        if (message.replace(/^\s\s*/, '').replace(/\s\s*$/, '')) {
            DWLive.sendPublicChatMsg(message); // 发送公聊
            this.setState({
                message: '',
            })
        } else {
            Toast.info('请输入内容', 1);
        }
    };
    showImg = () => {
        const {em} = this.state;
        this.setState({
            em: !em
        })
    };
    setEm = (value) => {
        const {message} = this.state;
        let emstr = '[em2_' + value + ']';
        this.setState({
            message: message + emstr,
            em: false
        })
    };
    handleMessage = value => {
        this.setState({
            message: value
        });
    };
    onLeftClick = () => {
        this.props.history.push('/index/room');
    };

    render() {
        const {roomStatus} = this.state;

        return (
            <div className="interaction room">
                <NavBar
                    mode="dark"
                    className="navbar"
                    leftContent={<Icon type="cross"></Icon>}
                    onLeftClick={this.onLeftClick}>
                    互动
                </NavBar>
                <div style={{height: '45px'}}></div>
                <div className="loading-example">
                    <div className="align">
                        <ActivityIndicator size="large" animating={this.state.loading}/>
                    </div>
                </div>
                {!roomStatus ?
                    <div className='room_close'>
                        <img src="../../assets/images/chat.png" alt=""/>
                        <p>互动版关闭中，请等待开放</p>
                    </div>
                    :
                    <div>
                        <div className='chat-content' ref='content' style={{maxHeight: this.state.pageHeight + 'px'}}>
                            {this.state.chat.map(item => (
                                <div key={item.userid}
                                     className={`top_list chatMsg ${item.userrole} ${item.gliveid == this.state.id ? 'me' : ''}`}>
                                    <WingBlank style={{padding: '0 5px'}}>
                                        <div className="username">
                                            <span>{item.username} <i>{item.userrole}</i></span>
                                        </div>
                                        <div className="body">
                                            {item.msg.map(obj => (
                                                obj.indexOf('view.css') > -1 ?
                                                    <img src={`//${obj}`} alt=""/> :
                                                    obj
                                            ))}
                                        </div>
                                        <WhiteSpace size="lg"/>
                                    </WingBlank>
                                </div>
                            ))}
                        </div>
                        < div className="chat-input">
                            <div id="embox" style={{height: this.state.em ? 'auto' : '0px'}}>
                                <table border="0" cellspacing="0" cellpadding="0">
                                    <tbody>
                                    <tr>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/01.png"
                                                 onTouchEnd={() => this.setEm('01')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/02.png"
                                                 onTouchEnd={() => this.setEm('02')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/03.png"
                                                 onTouchEnd={() => this.setEm('03')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/04.png"
                                                 onTouchEnd={() => this.setEm('04')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/05.png"
                                                 onTouchEnd={() => this.setEm('05')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/06.png"
                                                 onTouchEnd={() => this.setEm('06')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/07.png"
                                                 onTouchEnd={() => this.setEm('07')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/08.png"
                                                 onTouchEnd={() => this.setEm('08')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/09.png"
                                                 onTouchEnd={() => this.setEm('09')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/10.png"
                                                 onTouchEnd={() => this.setEm('10')}/></td>
                                    </tr>
                                    <tr>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/11.png"
                                                 onTouchEnd={() => this.setEm('11')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/12.png"
                                                 onTouchEnd={() => this.setEm('12')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/13.png"
                                                 onTouchEnd={() => this.setEm('13')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/14.png"
                                                 onTouchEnd={() => this.setEm('14')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/15.png"
                                                 onTouchEnd={() => this.setEm('15')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/16.png"
                                                 onTouchEnd={() => this.setEm('16')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/17.png"
                                                 onTouchEnd={() => this.setEm('17')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/18.png"
                                                 onTouchEnd={() => this.setEm('18')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/19.png"
                                                 onTouchEnd={() => this.setEm('19')}/></td>
                                        <td><img src="//view.csslcloud.net/img/em2_mobile/20.png"
                                                 onTouchEnd={() => this.setEm('20')}/></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <Button type='primary' className='chatSend' inline
                                    onClick={() => this.chatSend()}>发送</Button>
                            <InputItem
                                type="text"
                                clear
                                placeholder="请输入内容"
                                value={this.state.message}
                                onChange={this.handleMessage}
                            >
                                <img src="../../assets/images/img.png" alt="" className='showImg'
                                     onClick={() => this.showImg()}/>
                            </InputItem>

                        </div>
                    </div>
                }
            </div>
        );
    }
}
