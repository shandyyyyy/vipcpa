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
    Modal,
    List,
    Tabs,
    Picker,
    InputItem
} from 'antd-mobile';
import '../../assets/css/base.less';
import '../../assets/css/me.less';
import OrderList from '../../components/me/orderList';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

const tabs = [
    {title: "导师预约"},
    {title: "预约列表"},
];

export default class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groupID: 27,
            question: '',
            phone: '',
            tabIndex: 0,
            left: '3%',
            count: 6,
            dayAndTime: {},
            subjectArr: [],
            date: [],
            time: [],
            cols: 1,
            subjectID: [],
            dateValue: [],
            startTime: [],
            arr: [],
            pageHeight: document.documentElement.clientHeight - 45 - 50 - 25,
        };
    }

    componentWillMount() {
        let subject = 0;
        let groupID = this.state.groupID;
        gaodun_callback.Group.querySubjectForGroup(groupID, (resp) => {
            if (resp.status === 0) {
                let subjectMap = resp.result;
                let arrs = [];
                Object.keys(subjectMap).map(key => {
                    let obj = {};
                    obj.value = key;
                    obj.label = subjectMap[key];
                    arrs.push(obj);
                });
                this.state.subjectArr.push(arrs);
                this.setState({
                    subjectArr: this.state.subjectArr
                })
            }else{
                Toast.info('获取科目失败', 1);
            }
        });
        gaodun_callback.Group.getBooking(groupID, subject, (resp) => {
            let result = resp.result;
            let day = [];
            Object.keys(result).map(key => {
                let obj = {};
                obj.label = gaodun_callback.Methods.formatTime(Number(key) * 1000, true);
                obj.value = key;
                day.push(obj);
            });
            this.state.date.push(day);
            this.setState({
                date: this.state.date,
                dayAndTime: result
            })
        })
    }

    componentDidMount() {

    }

    handleMsgChange = value => {
        this.setState({
            question: value
        });
    };
    handlePhoneChange = value => {
        this.setState({
            phone: value
        });
    };
    tabClick = (index) => {
        this.setState({
            tabIndex: index,
            left: index === 1 ? '27%' : '3%'
        })
    };
    timeToString = (startTime, duration) => {
        let start = gaodun_callback.Methods.formatTime(startTime, false , true);
        let end = gaodun_callback.Methods.formatTime(startTime+duration, false , true);
        return start + '~' + end;
    };
    setTime = () => {
        // console.log(this.state);
        setTimeout(() => {
            this.setState({
                time: this.state.arr,
            });
        }, 120);
    };
    handleDate = (v) => {
        let Time = this.state.dayAndTime[v[0]];
        let arr = [];
        Time.forEach(item => {
            let timeObj = {};
            timeObj.label = this.timeToString(v[0]*1000+item.startTime*1000, item.duration*1000);
            timeObj.value = item.startTime;
            arr.push(timeObj);
        });
        this.state.arr = [];
        this.state.arr.push(arr);
        this.setState({
            dateValue: v,
            timeValue: []
        })
    };
    addOrder = () => {
        console.log(this.state);
        let groupID = this.state.groupID;
        let subjectID = this.state.subjectID[0];
        let date = this.state.dateValue[0];
        let startTime = this.state.startTime;
        let question = this.state.question;
        let phone = this.state.phone;
        gaodun_callback.Group.setBooking(groupID, subjectID, date, startTime, phone, question,(resp)=>{
            console.log(resp);
        });
    };
    onLeftClick = () => {
        this.props.history.push('/index/me');
    };

    render() {
        return (
            <div className="order">
                <NavBar
                    mode="light"
                    className="navbar"
                    leftContent={<Icon type="cross"></Icon>}
                    onLeftClick={this.onLeftClick}>
                </NavBar>
                <div style={{height: '45px'}}></div>
                <WingBlank>
                    <Tabs tabs={tabs}
                          initialPage={this.state.tabIndex}
                          tabBarActiveTextColor="#008489"
                          tabBarUnderlineStyle={{borderColor: '#008489', left: this.state.left}}
                          onChange={(tab, index) => {
                              this.tabClick(index);
                          }}
                          onTabClick={(tab, index) => {
                              this.tabClick(index);
                          }}
                    >
                        <div style={{height: this.state.pageHeight + 'px', backgroundColor: '#fff'}}>
                            {/*<Route exact path='/index/room' component={TopList}/>*/}
                            {/*<Order history={this.props.history}/>*/}
                            <div className='count'>本周还有{this.state.count}次导师预约机会</div>
                            <Picker
                                title='科目选择'
                                data={this.state.subjectArr}
                                cols={this.state.cols}
                                extra=''
                                value={this.state.subjectID}
                                // onChange={v => this.setState({subValue: v})}
                                onOk={v => this.setState({subjectID: v})}
                                cascade={false}
                            >
                                <List.Item>科目选择</List.Item>
                            </Picker>
                            <Picker
                                title='日期选择'
                                data={this.state.date}
                                cols={this.state.cols}
                                extra=''
                                value={this.state.dateValue}
                                // onChange ={v => this.handleDate(v)}
                                onOk={v => this.handleDate(v)}
                                cascade={false}
                            >
                                <List.Item>日期选择</List.Item>
                            </Picker>
                            <Picker
                                title='时间段选择'
                                data={this.state.time}
                                cols={this.state.cols}
                                extra=''
                                value={this.state.startTime}
                                // onChange={v => this.setState({timeValue: v})}
                                onOk={v => this.setState({startTime: v})}
                                cascade={false}
                            >
                                <List.Item onClick={() => this.setTime()}>时间段选择</List.Item>
                            </Picker>
                            <InputItem type="phone" className="phone" clear placeholder='输入手机号' value={this.state.phone}
                                       onChange={this.handlePhoneChange}>手机号码</InputItem>
                            <section className='order_text'>
                                <InputItem type="text" clear placeholder='描述您需要解决的问题' value={this.state.question}
                                           onChange={this.handleMsgChange}/>
                                <Icon type='check' onClick={() => this.addOrder()}/>
                            </section>
                        </div>

                        <div
                            style={{height: this.state.pageHeight + 'px', backgroundColor: '#fff', overflow: 'hidden'}}>
                            {/*<Route path='/index/room/myIssue' component={IssueList}/>*/}
                            <OrderList/>
                        </div>
                    </Tabs>
                </WingBlank>
            </div>
        );
    }
}
