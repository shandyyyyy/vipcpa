import React from 'react';
import {Route} from 'react-router-dom';
import antdMobile from 'antd-mobile';

const {
    Toast,
    Modal,
    ActivityIndicator
} = antdMobile;
import '../../assets/css/base.less';
import '../../assets/css/room.less';

const prompt = Modal.prompt;

export default class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupID: 27,
            historyBooking: [],
            subjectMap: gaodun_callback.Data.subjectMap,
            modal: false,
            rate: [
                {score: 1, active: true},
                {score: 2, active: true},
                {score: 3, active: false},
                {score: 4, active: false},
                {score: 5, active: false}
            ]
        };
    }

    componentWillMount() {
        //查询预约列表
        gaodun_callback.Group.getHistoryBooking(this.state.groupID, (resp) => {
            if (resp.status === 0) {
                let record = resp.result.record;
                record.forEach(item => {
                    item.subjectName = this.state.subjectMap[item.subject];
                    item.formatDate = gaodun_callback.Methods.formatTime(item.date * 1000 + item.startTime * 1000) + '~' + gaodun_callback.Methods.formatTime((item.date + item.startTime + item.duration) * 1000, false, true);
                    item.status = (item.date + item.startTime + item.duration) * 1000 > new Date().getTime() ? 'unfinished' : 'finished';
                });
                this.setState({
                    historyBooking: record,
                    loading: false
                })
            } else {
                Toast.info('获取预约列表错误', 1);
            }
        })
    }

    componentDidMount() {

    }

    handleClick = (item) => {
        const {historyBooking} = this.state;
        if (item.status === 'finished' && item.score === -1) {
            console.log('评价');
            this.props.history.push({
                pathname: `/me/judge`,
                state: item
            })
        } else if(item.score !== -1){
            Toast.info('已评价', 1);
        } else {
            let subjectID = item.subject;
            let date = item.date;
            let startTime = item.startTime;
            gaodun_callback.Group.cancelBooking(this.state.groupID, subjectID, date, startTime, (resp) => {
                if (resp.status === 0) {
                    historyBooking.splice(historyBooking.findIndex(arr => arr.date === item.date), 1);
                    this.setState({
                        historyBooking: historyBooking
                    })
                } else {
                    Toast.fail('取消预约失败', 1);
                }
            })
        }
    }
    render() {
        const {historyBooking,loading} = this.state;
        return (
            <div className='orderList'>
                {historyBooking.map((item, index) => (
                    <section className={item.status === 'finished' ? 'card finished' : 'card unfinished'}>
                        <p>{item.status === 'finished' ? (item.score === -1 ? '已结束，等待评价' : '已评价') : '等待辅导，请保持电话畅通'}</p>
                        <div className='info'>
                            <p>{item.subjectName} {item.formatDate}</p>
                            <p className='status'
                               onClick={() => this.handleClick(item, index)}>{item.status === 'finished' ? (item.score === -1 ? '评价' : '已评价') : '取消'}</p>
                        </div>
                    </section>
                ))}
                <div className="loading-example">
                    <div className="align">
                        <ActivityIndicator size="large" animating={loading}/>
                        {historyBooking.length>0?'':
                            <div >暂无数据</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
