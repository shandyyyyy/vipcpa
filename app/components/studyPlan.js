import React from 'react';
import antdMobile from 'antd-mobile';

const {
    WingBlank,
    WhiteSpace,
    Grid,
    Flex,
    NavBar,
    Icon,
    Button,
    Toast,
    Modal,
    List,
    Radio,
    Checkbox,
    Carousel,
    SwipeAction
} = antdMobile;
import '../assets/css/studyPlan.less';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from 'actions/modal';
import MyModal from './planModal';

const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
const RadioItem = Radio.RadioItem;

@connect(
    (state) => {
        return {state}
    },
    (dispatch) => bindActionCreators({...actions}, dispatch)
)

export default class StudyPlan extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '学习计划',
            today: new Date().getMonth() + 1 + '月' + new Date().getDate() + '日', //今天的日期
            todayShow: true, //显示今天任务
            currentDay: new Date().getMonth() + 1 + '月' + new Date().getDate() + '日', //当前查询日期
            modal: false,
            pageHeight: document.documentElement.clientHeight - 50,
            studyObj: {
                modal: 'free',
                time: 0
            },
            count: 0,
            time: 0,
            setIntervalTime: null,
            studyStatus: false,
            notice: gaodun_callback.Data.notice,
            data: [
                {
                    id: 1,
                    finished: false,
                    label: 'basketball basketballbasketballbasketballbasketball',
                    brief: 'details',
                    thumb: '//zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
                },
                {
                    id: 2,
                    finished: false,
                    label: 'football',
                    brief: 'details',
                    thumb: '//zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
                },
                {
                    id: 3,
                    finished: true,
                    label: 'football',
                    brief: 'details',
                    thumb: '//zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'
                },
            ]
        };
    }

    componentWillMount() {
        const {studyStatus} = this.state;
        let studyTimeObj = JSON.parse(localStorage.getItem('studyTime'));
        let count = parseInt(localStorage.getItem('count'));
        if (studyTimeObj !== null) {
            this.setState({
                studyStatus: true,
                studyObj: {
                    modal: Object.keys(studyTimeObj)[0],
                    time: studyTimeObj[Object.keys(studyTimeObj)]
                },
                count: count
            })
        }

    }

    componentDidMount() {

    }

    onChange = (i) => {
        if(i.finished){
            return;
        }
        this.state.data.forEach((item) => {
            if (item.id === i.id) {
                item.finished = true;
            }
        });
        this.setState({
            data: this.state.data
        })
    };
    handleDelay = (i) => {
        this.state.data.forEach((item) => {
            if (item.id === i.id) {
                Toast.success("showModal", 1);
            }
        });
    };

    queryList = (key) => {
        console.log(key);
    };
    showModal = () => {
        // e.preventDefault(); // 修复 Android 上点击穿透
        if (this.state.studyObj.time !== 0) {
            this.setState({
                studyObj: {
                    modal: 'free',
                    time: 0
                },
                count: 0
            }, () => {
                localStorage.removeItem('studyTime');
                localStorage.removeItem('count');
            });
            clearInterval(this.state.setIntervalTime);
        } else {
            this.props.changeModalState(true);
        }
    };
    startPlan = (key) => {
        localStorage.removeItem('studyTime');
        localStorage.removeItem('count');
        this.props.changeModalState(false);
        this.study(key);
    };
    study = (key) => {
        let {count, studyObj} = this.state;
        localStorage.setItem('count', ++count);

        this.state.setIntervalTime = setInterval(function (that) {
            my_alert(that);
        }, 1000, this);

        const my_alert = (that) => {
            console.log(1);
            let time = ++studyObj.time;

            if (key === 'tomato' && time >= 5 * count) {
                clearInterval(that.state.setIntervalTime);
                alert('太棒了', <div>已收获一个番茄<p>是否继续休息下继续学习</p></div>, [
                    {
                        text: '休息5分钟', onPress: () => {
                            console.log("休息5分钟");
                        }
                    },
                    {
                        text: '继续学习', onPress: () => {
                            count++;
                            localStorage.setItem('count', count);
                            that.setState({
                                count: count
                            });
                            that.state.setIntervalTime = setInterval(function (that) {
                                my_alert(that);
                            }, 1000, that);
                        }
                    },
                ]);
            }

            let obj = {};
            obj[key] = time;
            localStorage.setItem('studyTime', JSON.stringify(obj));
            // that.state.studyObj.modal = key;
            // that.state.studyObj.time = time;
            let a = {
                modal: key,
                time: time
            }
            console.log(a);
            console.log(that)
            that.setState({
                studyObj: a,
                time: time
            },()=>{
                console.log('77');
            });
        };
    };

    render() {
        const {notice, studyObj} = this.state;
        console.log("studyObj", studyObj);
        const point = () => (
            <span className="point">今天<i/></span>
        );
        return (
            <div className="studyPlan" style={{height: this.state.pageHeight + 'px', overflow: 'auto'}}>
                <WingBlank>
                    <WhiteSpace size="lg"/>
                    <Flex className="title">
                        <Flex.Item className="left">学习计划</Flex.Item>
                        <Flex.Item className="right">
                            <p>2018年考试倒计时</p>
                            <p className="time">157<span>天</span></p>
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace size="lg"/>
                </WingBlank>
                <section>
                    <Carousel className="my-carousel"
                              vertical
                              dots={false}
                              dragging={false}
                              swiping={false}
                              autoplay
                              autoplayInterval={5000}
                              infinite
                    >
                        {notice.map(item => (
                            <div className="v-item">{item}</div>
                        ))}
                    </Carousel>

                </section>
                <div className="today_date">
                    <WingBlank>
                        <WhiteSpace size="lg"/>
                        <Flex>
                            <Flex.Item className="my_arrow" onClick={() => this.queryList('prev')}><Icon
                                type="left"/></Flex.Item>
                            <Flex.Item>
                                <p>3 个任务</p>
                                <p> {this.state.todayShow
                                    ? point()
                                    : ''
                                }
                                    {this.state.currentDay}
                                </p>
                            </Flex.Item>
                            {/*<Flex.Item className="my_ellipsis">*/}
                            {/*<Icon type="search"/>*/}
                            {/*<Icon type="ellipsis"/>*/}
                            {/*</Flex.Item>*/}
                            {this.state.todayShow
                                ? ''
                                : <Flex.Item className="my_arrow" onClick={() => this.queryList('today')}>今天</Flex.Item>
                            }
                            <Flex.Item className="my_arrow" onClick={() => this.queryList('next')}><Icon type="right"/></Flex.Item>
                        </Flex>
                        <WhiteSpace size="lg"/>
                    </WingBlank>
                </div>
                <WingBlank>
                    <WhiteSpace size="lg"/>
                    <Button type="warning" className="startPlan"
                            onClick={() => this.showModal()}>{studyObj.time > 0 ? studyObj.time : "开始学习计时"}</Button>
                    <WhiteSpace size="lg"/>
                    {/*//modal*/}
                    <MyModal startPlan={this.startPlan} pageHeight={this.state.pageHeight}/>
                </WingBlank>
                <div className="list_play">
                    {this.state.data.map(i => (
                        <SwipeAction
                            autoClose
                            disabled={i.finished?true:false}
                            right={[
                                {
                                    text: '推迟一天',
                                    onPress: () => this.handleDelay(i),
                                    style: {backgroundColor: '#ea3e3f', color: 'white'},
                                },
                            ]}
                        >
                            <Flex key={i.id}>
                                <Flex.Item>
                                    <Item
                                        key={i.id}
                                        thumb={i.thumb}
                                        multipleLine
                                    >
                                        {i.label}
                                        <Brief>{i.brief}</Brief>
                                    </Item>
                                </Flex.Item>
                                <Flex.Item className="my_checkbox">
                                    <CheckboxItem key={i.id} checked={i.finished === true}
                                                  onChange={() => this.onChange(i)}/>
                                </Flex.Item>
                            </Flex>
                        </SwipeAction>
                    ))}
                </div>
            </div>
        );
    }
}