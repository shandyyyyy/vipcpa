import React from 'react';
import ReactDOM from 'react-dom';
import antdMobile from 'antd-mobile';
const {
    WingBlank,
    WhiteSpace,
    Icon,
    List,
    Modal,
    Flex,
    Toast,
    ActivityIndicator
} = antdMobile;
import '../../assets/css/base.less';
import '../../assets/css/course.less';

const Item = List.Item;
const Brief = Item.Brief;

export default class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
    }

    componentWillMount() {
        gaodun_callback.Class.query(
            (function (that) {
                return function (resp) {
                    if (resp.status === 0) {
                        let classList = resp.result.classList;
                        let cpaClass = [];
                        classList.forEach((item,index)=>{
                            // if(item.groupID === 27){
                            //     cpaClass.push(item);
                            // }
                            cpaClass.push(item);
                        });
                        cpaClass.forEach((item)=>{
                            item.classProgress = that.handleMeeting(item.schedule);
                        });
                        that.setState({
                            data: cpaClass,
                            loading: false
                        });
                    } else {
                        Toast.fail("出错了", 1)
                    }
                }

            })(this)
        )
    }

    componentDidMount() {

    }
    handleMeeting(m){
        let obj = {
            total: m.length,
            finishedNum: 0
        };
        let nowTime = gaodun_callback.Data.timestamp;
        m.forEach((item)=>{
            if( item.endTime ){
                obj.finishedNum++;
            } else {
                let time = item.startTime + (item.duration + 7200) * 1000;
                if( time < nowTime) {
                    obj.finishedNum++;
                }
            }
        });
        return obj;
    }

    goMeetingList = (item) =>{
        console.log(item);
        gaodun_callback.Data.currentClass = item;
        gaodun_callback.Methods.saveData();
        this.props.history.push('/course/meeting');
    };
    render() {
        return (
            <div>
                <div className="loading-example">
                    <div className="align">
                        <ActivityIndicator size="large" animating={this.state.loading}/>
                    </div>
                </div>
                {this.state.data.length === 0?<div>暂时没有VIPCPA课程</div>:''}
                <WingBlank style={{margin: '0 20px'}} >
                    {this.state.data.map(item => (
                        <div className="course_list" key={item.id} onClick={()=>this.goMeetingList(item)}>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                            <div className="title">
                                {item.name}
                            </div>
                            <WhiteSpace size="lg"/>
                            <div className="body">
                                <span>课程进度</span>
                                <div className="arrow"><span style={{verticalAlign: 'top'}}>查看课程</span> <Icon type="right" size="sm"/></div>
                            </div>
                            <WhiteSpace size="lg"/>
                            <div className="progress">
                                <div className={item.classProgress.finishedNum/item.classProgress.total*100 === 100?'wrap finish':(item.classProgress.finishedNum/item.classProgress.total*100 === 0?'wrap meeting':'wrap')} >
                                    <div className="inner"></div>
                                    <span>{item.classProgress.finishedNum}/{item.classProgress.total}</span>
                                </div>
                            </div>
                            <WhiteSpace size="lg"/>
                            <div className="line" style={{borderBottom: '1px solid #ddd', height: '1px'}}></div>
                        </div>
                    ))}
                </WingBlank>
            </div>
        );
    }
}