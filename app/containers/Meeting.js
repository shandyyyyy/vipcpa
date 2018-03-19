import React from 'react';
import ReactDOM from 'react-dom';
import {
    WingBlank,
    WhiteSpace,
    NavBar,
    Icon,
    ListView,
    Button,
    TextareaItem,
    Toast,
    Modal,
    Steps,
    ActivityIndicator
} from 'antd-mobile';

import '../assets/css/meeting.less';

const Step = Steps.Step;
const customIcon = () => (
    <Icon type="check-circle"></Icon>
);
export default class Meeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classID: 0,
            className: '三月',
            groupID: 27,
            groupName: 'VIPCPA',
            template: 0,
            progress: 10 || (gaodun_callback.Data.currentClass.progress.finishedNum / gaodun_callback.Data.currentClass.progress.total * 100).toFixed(2),
            tabs: {},
            section: [],
            months: [],
            meeting: [],
            isOngoing: false,
            showModal: false,
            arrays: [],
            pageHeight: document.documentElement.clientHeight - 20
        };
    }

    componentWillMount() {
        gaodun_callback.GetData.getClass(60, (result) => {
            // window.alert(JSON.stringify(result));
            let classID = result.id;
            let className = result.name;
            let groupID = result.groupID;
            let template = gaodun_callback.Methods.backConvert(result.template, 2)[1];
            this.setState({
                classID: classID,
                className: className,
                groupID: groupID,
                template: template
            },()=>{
                this.getDate();
            });
        });
    }

    componentDidMount() {

    }

    getDate = () => {
        //查询section
        gaodun_callback.Config.type = 1;
        gaodun_callback.Group.queryTag(this.state.groupID, (resp) => {
                // window.alert(JSON.stringify(resp));
                if (resp.status === 0) {
                    let section = resp.result;
                    section[0] = "其他";
                    gaodun_callback.Data.section = section;
                    this.setState({
                        tabs: section
                    })
                } else {
                    Toast.fail("出错了tag", 1, function () {
                        history.back();
                    })
                }
            }
        );
        gaodun_callback.Meeting.queryByClass(
            this.state.classID, (resp) => {
                // window.alert(JSON.stringify(resp));
                if (resp.status === 0) {
                    let timestamp = (new Date().getTime()) || gaodun_callback.Data.timestamp;
                    let nowDay = parseInt(new Date().getTime() / 1000 / 60 / 60 / 24);
                    let meeting = resp.result.meeting.sort(function (a, b) {
                        return a.startTime - b.startTime;
                    });
                    meeting.forEach((item) => {
                        if (nowDay === parseInt(new Date(item.startTime).getTime() / 1000 / 60 / 60 / 24)) {
                            item.formatTime = gaodun_callback.Methods.formatTime(item.startTime) + "~" + gaodun_callback.Methods.formatTime(item.startTime + item.duration * 1000, false, true);
                        } else {
                            item.formatTime = gaodun_callback.Methods.formatTime(item.startTime, true);
                        }
                    });
                    this.state.meeting = this.classifyMeetings(meeting, timestamp);
                    // this.setState({
                    //     meeting: this.state.meeting
                    // })
                } else {
                    Toast.fail("出错了meeting", 1, function () {
                        history.back();
                    })
                }
            }
        );
        gaodun_callback.Progress.queryMineByClass(
            this.state.classID, (resp) => {
                // window.alert(JSON.stringify(resp));
                if (resp.status === 0) {
                    // window.alert(resp.status + 'progress');
                    let progress = resp.result.progress;
                    let meeting = this.state.meeting;
                    meeting.forEach((mObj) => {
                        progress.forEach((pObj) => {
                            if (mObj.id === pObj.meetingID) {
                                mObj.progress = pObj;
                                mObj.finishedAllCount = Object.keys(pObj.courseware).length + Object.keys(pObj.exam).length + Object.keys(pObj.video).length;
                                try {
                                    mObj = this.MeetingsProgressStatus(mObj, pObj);
                                } catch (e) {
                                    alert(e);
                                }
                            }
                        })
                    });
                    //课程列表
                    let flag = true;
                    for (let i = 0; i < meeting.length; i++) {
                        if (meeting[i].section !== 0) {
                            flag = false;
                            break;
                        }
                    }
                    //按时间排序
                    if (flag === true) {
                        meeting = this.classifyByMonth(meeting);
                    }
                    else {
                        //按阶段排序
                        this.state.section = this.classifyBySection(meeting);
                        this.state.section[0].class = "active";
                    }
                    this.setState({
                        meeting: meeting,
                        section: this.state.section,
                        currentSection: this.state.section.length > 0 ? this.state.section[0].section : 0,
                    });
                    // alert("ok");
                    console.log(this.state)
                } else {
                    Toast.fail("出错了progress", 1, function () {
                        history.back();
                    })
                }
            }
        )
    };
    //meeting状态
    classifyMeetings = (obj, time) => {
        let nowTime = time;

        for (let i = 0; i < obj.length; i++) {
            // EndTime > 0  Or   StartTime + Duration + 2 Hours
            let ongoingStartTime = obj[i].type <= 1 ? obj[i].startTime - 30 * 60 * 1000 : (obj[i].type === 3 ? obj[i].startTime - 120 * 60 * 1000 : obj[i].startTime);

            if ((obj[i].endTime > 0) || ((obj[i].startTime + obj[i].duration * 1000 + 7200000) < nowTime)) {
                obj[i].liveType = "replay";
            }
            else if ((ongoingStartTime < nowTime) && (obj[i].endTime === 0) && ((obj[i].startTime + obj[i].duration * 1000 + 7200000) > nowTime)) {
                obj[i].liveType = "ongoing";
                this.state.isOngoing = true;
            }
            else {
                obj[i].liveType = "meeting";
            }
        }
        return obj;
    };
    classifyBySection = (list) => {
        // alert("classifyBySection");
        let obj = {};
        for (let i = 0; i < list.length; i++) {
            let s = list[i].section;
            if (obj[s] === undefined) {
                obj[s] = {};
                obj[s].name = this.state.tabs[s];
                obj[s].value = [];
            }
            obj[s].value.push(list[i]);
        }
        let arr = [];
        for (let k in obj) {
            let o = {};
            o.section = Number(k);
            o.name = obj[k].name;
            o.meeting = obj[k].value;
            o.class = "";
            if (Number(k) !== 0) {
                arr.push(o);
            }
        }
        if (obj[0] !== undefined) {
            obj[0].section = 0;
            obj[0].meeting = obj[0].value;
            obj[0].class = "";
            arr.push(obj[0]);
        }
        // alert("classifyBySection11");
        return arr;
    };
    classifyByMonth = (list) => {
        // alert("classifyByMonth");
        let allMonth = [];
        for (let i = 0; i < list.length; i++) {
            let d = new Date(list[i].startTime),
                year = d.getFullYear(),
                months = d.getMonth() + 1;
            let month = year * 12 + months;
            let m = (month % 12) === 0 ? 12 : (month % 12)
            list[i].month = m;
            if (allMonth[i] === undefined) {
                allMonth[i] = m;
            }
        }
        let monthsData = Array.from(new Set(allMonth));
        let monthsArr = [];

        for (let i = 0; i < monthsData.length; i++) {
            let monthsObj = {};
            monthsObj.name = monthsData[i] + "月课程";
            monthsObj.class = "";
            monthsObj.id = monthsData[i];
            monthsArr.push(monthsObj);
        }
        monthsArr[monthsData.length - 1].class = "active";

        this.setState({
            months: monthsArr,
            monthId: monthsArr[monthsData.length - 1].id
        });
        // alert("classifyByMonth222");
        return list;
    };
    // //meeting详细状态
    MeetingsProgressStatus = (obj, progress) => {
        if (obj.type === 0 || obj.type === 1) {
            //直播课
            obj.typeName = "直播课";
            if (obj.liveType === 'replay') {
                obj.statusName = "观看回放";
                if (obj.replay.length === 0) {
                    obj.statusName = "等待回放";
                }
            } else if (obj.liveType === 'ongoing') {
                obj.statusName = "去上课";
            } else {
                obj.statusName = "等待上课";
            }

        } else if (obj.type === 2) {
            //阶段测试
            obj.typeName = "阶段测试";
            if (obj.liveType === 'replay') {
                obj.statusName = "查看试卷";
                let preparationExam = [];
                for (let i = 0; i < obj.exam.length; i++) {
                    if (obj.exam[i].preparation === 2) {
                        preparationExam.push(obj.exam[i]);
                    }
                }
                if (preparationExam.length > 0) {
                    let finishExam = progress.exam;

                    if (finishExam[preparationExam[0].id] === undefined) {
                        obj.statusName = "补做试卷";
                    } else {
                        obj.statusName = "查看试卷";
                    }

                }
            } else if (obj.liveType === 'ongoing') {
                obj.statusName = "去测验";
            } else {
                obj.statusName = "等待测验";
            }

        } else if (obj.type === 4) {
            //录播课
            obj.typeName = "录播课";
            obj.statusName = "观看视频";
        }
        return obj;
    };
    // //changeSection
    changeSection = (obj) => {
        let currentSection = obj.section;
        let section = this.state.section;
        for (let i = 0; i < section.length; i++) {
            section[i].class = "";
            if (section[i].section === currentSection) {
                section[i].class = "active";
            }
        }
        this.setState({
            section: section,
            currentSection: currentSection
        })
    };
    // //changeMonth
    changeMonth = (obj) => {
        let monthId = obj.id;
        let months = this.state.months;
        for (let i = 0; i < months.length; i++) {
            months[i].class = "";
            if (months[i].id === monthId) {
                months[i].class = "active";
            }
        }
        this.setState({
            months: months,
            monthId: monthId
        })
    };

    leave = (obj, index) => {
        if (obj.progress.meeting === 0) {
            gaodun_callback.Meeting.askForLeave(
                obj.id,
                (function (that) {
                    return function (resp) {
                        if (resp.status === 0) {
                            let meeting = that.state.meeting;
                            meeting[index].progress.meeting = -1;
                            that.setState({
                                meeting: meeting
                            })
                        } else {
                            Toast.fail("请稍后重试", 1)
                        }
                    }
                })(this)
            );
        } else {
            gaodun_callback.Meeting.cancelLeave(
                obj.id,
                (function (that) {
                    return function (resp) {
                        if (resp.status === 0) {
                            let meeting = that.state.meeting;
                            meeting[index].progress.meeting = 0;
                            that.setState({
                                meeting: meeting
                            })
                        } else {
                            Toast.fail("请稍后重试", 1)
                        }
                    }
                })(this)
            );
        }
    };
    onClose = () => {
        this.setState({
            showModal: false
        })
    };
    //进入课件
    showCourseware = (meeting, index) => {
        gaodun_callback.Data.currentMeetingObj = meeting;
        meeting.template = meeting.liveType === "replay" ? 0 : this.state.template;
        meeting.mStatus = (meeting.liveType === "replay" || meeting.liveType === "ongoing") ? true : false;

        let array = [];
        let keqian = [];
        let kezhong = [];
        let kehou = [];

        let finishExam = meeting.progress.exam;
        let finishCourseware = meeting.progress.courseware;
        let finishVideo = meeting.progress.video;
        //exam
        let examQ = [];
        let examZ = [];
        let examH = [];
        for (let i = 0; i < meeting.exam.length; i++) {
            meeting.exam[i].type = 'exam';
            meeting.exam[i].finished = false;
            for (let j in finishExam) {
                if (parseInt(j) === meeting.exam[i].id) {
                    meeting.exam[i].finished = true;
                    meeting.exam[i].correct = finishExam[j].correct;
                    meeting.exam[i].total = finishExam[j].total;
                    meeting.exam[i].correctRate = meeting.exam[i].total > 0 ? (meeting.exam[i].correct / meeting.exam[i].total * 100).toFixed(0) : 0;
                }
            }
            if (meeting.exam[i].preparation === 1) {
                keqian.push(meeting.exam[i])
            } else if (meeting.exam[i].preparation === 2) {
                kezhong.push(meeting.exam[i])
            } else {
                kehou.push(meeting.exam[i])
            }
        }
        //courseware
        for (let i = 0; i < meeting.courseware.length; i++) {
            meeting.courseware[i].type = 'courseware';
            meeting.courseware[i].finished = false;
            for (let j in finishCourseware) {
                if (j === meeting.courseware[i].id) {
                    meeting.courseware[i].finished = true;
                }
            }

            if (meeting.courseware[i].preparation === 1) {
                keqian.push(meeting.courseware[i])
            } else if (meeting.courseware[i].preparation === 2) {
                kezhong.push(meeting.courseware[i])
            } else {
                kehou.push(meeting.courseware[i])
            }
        }
        //video
        let videoQ = [];
        let videoZ = [];
        let videoH = [];
        for (let i = 0; i < meeting.video.length; i++) {
            meeting.video[i].type = 'video';
            meeting.video[i].finished = false;
            for (let j in finishVideo) {
                if (j === meeting.video[i].id) {
                    meeting.video[i].finished = true;
                }
            }
            if (meeting.video[i].preparation === 1) {
                keqian.push(meeting.video[i])
            } else if (meeting.video[i].preparation === 2) {
                kezhong.push(meeting.video[i])
            } else {
                kehou.push(meeting.video[i])
            }
        }
        array.push(keqian);
        array.push(kezhong);
        array.push(kehou);
        //
        if (meeting.liveType === "meeting") {
            let flag = false;
            for (let i = 0; i < meeting.exam.length; i++) {
                if (meeting.exam[i].preparation === 1) {
                    flag = true;
                    break;
                }
            }
            for (let i = 0; i < meeting.courseware.length; i++) {
                if (meeting.courseware[i].preparation === 1) {
                    flag = true;
                    break;
                }
            }
            for (let i = 0; i < meeting.video.length; i++) {
                if (meeting.video[i].preparation === 1) {
                    flag = true;
                    break;
                }
            }
            //按时间解锁
            if (meeting.template) {
                if (this.state.isOngoing && (index >= 1 && this.state.meeting[index - 1].liveType === 'ongoing')) {
                    console.log("可以看课前");
                } else if (this.state.isOngoing === false && (index >= 1 && this.state.meeting[index - 1].liveType === 'replay')) {
                    console.log("可以看课前");
                } else if (index === 0) {
                    console.log("可以看课前");
                } else {
                    Toast.info('暂未解锁作业', 1);
                    return;
                }
            }
            if (flag) {
                this.state.meeting[index].array = array.slice(0, 1);
                this.state.arrays = array.slice(0, 1);
                this.setState({
                    meeting: this.state.meeting,
                    arrays: this.state.arrays,
                    showModal: true
                })
            } else {
                Toast.info('暂无课前作业', 1);
            }
        } else if (meeting.liveType === "ongoing") {
            //按时间解锁
            if (meeting.template) {
                console.log("可以看课前，课中");
                this.state.meeting[index].array = array.slice(0, 2);
                this.state.arrays = array.slice(0, 2);
                this.setData({
                    meeting: this.state.meeting,
                    arrays: this.state.arrays,
                    showModal: true
                })
            } else {
                console.log("可以看课前，课中,课后");
                this.state.meeting[index].array = array;
                this.state.arrays = array;
                this.setState({
                    meeting: this.state.meeting,
                    arrays: this.state.arrays,
                    showModal: true
                })
            }
        } else {
            this.state.meeting[index].array = array;
            this.state.arrays = array;
            this.setState({
                meeting: this.state.meeting,
                arrays: this.state.arrays,
                showModal: true
            })
        }
        console.log(this.state);
    };

    goWhere = (meeting) => {
        gaodun_callback.Data.currentMeetingObj = meeting;
        let doItAgain = false;
        let mType = meeting.type;
        switch (mType) {
            case 0:
                this.goLive(meeting);
                break;
            case 1:
                this.goLive(meeting);
                break;
            case 2:
                this.goExam(meeting, null, doItAgain);
                break;
            case 3:
                // this.goRoom(meeting);
                break;
            case 4:
                this.goVideo(meeting, null);
                break;
            default:
                break;
        }
    };
    stepWhere = (obj) => {
        let meeting = gaodun_callback.Data.currentMeetingObj;
        switch (obj.type) {
            case 'exam':
                this.goExam(meeting, obj);
                break;
            case 'video':
                this.goVideo(meeting, obj);
                break;
            case 'courseware':
                this.goPpt(obj);
                break;
            default:
                break;
        }
    };
    //直播课
    goLive = (meeting) => {
        if (meeting.statusName === "去上课") {
            Toast.info('直播间', 1);
            let roomID = gaodun_callback.Data.currentClass.platformData;
            let className = encodeURIComponent(gaodun_callback.Data.currentClass.name);
            window.location.href = '//glive.gaodun.com/m/play.html?CF5928368147E4E3&' + roomID + "&" + className + "&" + meeting.id + "&1";
        } else if (meeting.statusName === "等待上课") {
            Toast.info('还未开始上课', 1);
        } else {
            let replay = meeting.replay;
            if (replay.length === 0) {
                Toast.info('回放尚未生成', 1);
            } else {
                if (replay[0].indexOf("http") > -1) {
                    Toast.info('回放链接replay', 1);
                    // wx.navigateTo({
                    //     url: '../gReplay/gReplay?replay=' + encodeURIComponent(JSON.stringify(replay[0])),
                    // })
                } else {
                    Toast.info('回放列表', 1);
                }
            }
        }
    };
    //阶段测试
    goExam = (meeting, examObj, doItAgain) => {
        let meetingId = meeting.id;
        let exam = meeting.exam;
        //试卷情况
        let preparationExam = [];
        for (let i = 0; i < exam.length; i++) {
            if (exam[i].preparation === 2) {
                preparationExam.push(exam[i]);
            }
        }
        if (examObj) {
            let examObj = examObj;
        } else {
            if (preparationExam.length > 0) {
                let examObj = preparationExam[0];
            } else {
                Toast.info('课中没有试卷', 1);
                return;
            }
        }
        console.log(examObj);
        if (this.state.template) {
            // console.log(meeting);
            if (meeting.liveType === "ongoing" || meeting.liveType === "replay") {
                Toast.info('做试卷', 1);
            } else {
                Toast.info('试卷暂未开放', 1);
            }
            return;
        }
        Toast.info('qu做试卷', 1);
        window.location.href = '//glive.gaodun.com/m/exam.html?' + meeting.id + '&' + examObj.id + '&0' + (doItAgain ? '&' + doItAgain : '');
    };
    //播放视频
    goVideo = (meeting, videoObj) => {
        let video = meeting.video;
        let flag = false;
        let videoOBJ;
        for (let i = 0; i < video.length; i++) {
            if (video[i].preparation === 2) {
                videoOBJ = video[i];
                flag = true;
                break;
            }
        }
        for (let i = 0; i < video.length; i++) {
            if (video[i].preparation === 1) {
                videoOBJ = video[i];
                flag = true;
                break;
            }
        }
        if (videoObj) {
            videoOBJ = videoObj;
        } else {
            if (flag) {

            } else {
                Toast.info("暂无视频", 1);
            }
        }
        if (this.state.template) {
            // console.log(meeting);
            if (meeting.liveType === "ongoing" || meeting.liveType === "replay") {
                Toast.info('去看视频', 1);
                let videoID = videoOBJ.id;
                let videoName = videoOBJ.name;
                gaodun_callback.DoVideoCmd.playVideo(videoID, videoName, (result)=>{
                    this.setState({
                        showModal: false
                    });
                    // window.alert(JSON.stringify(result));
                });
            } else {
                Toast.info('视频暂未开放', 1);
            }
            return;
        }
        Toast.info('去看视频', 1);
        let videoID = videoOBJ.id;
        let videoName = videoOBJ.name;
        gaodun_callback.DoVideoCmd.playVideo(videoID, videoName, (result)=>{
            // window.alert(JSON.stringify(result));
            this.setState({
                showModal: false
            });
        });
        console.log(videoOBJ);
    };
    //ppt
    goPpt = (obj) => {
        Toast.info('ppt', 1);
    };
    onLeftClick = () => {
        this.props.history.push('/index/course');
    };

    render() {
        return (
            <div className="meeting">
                {gaodun_callback.Config.app ? '' :
                    <div className='my_nav'>
                        <NavBar
                            mode="light"
                            className="navbar"
                            leftContent={<Icon type="left"></Icon>}
                            onLeftClick={this.onLeftClick}>
                            {this.state.className}
                        </NavBar>
                        <div style={{height: '35px'}}></div>
                    </div>
                }
                <div className='nextCourse'>
                    <div className='wrap'>
                        <div className='courseInfo'>
                            <p className='groupName'>{this.state.groupName}</p>
                            <p>{this.state.className}</p>
                            <div className='wrap-pro'>
                                <div className='inner-pro' style={{width: this.state.progress + '%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="loading-example">
                    <div className="align">
                        <ActivityIndicator size="large" animating={this.state.meeting.length === 0}/>
                    </div>
                </div>
                <div className='tabs'>
                    <div className='tabs_list'>
                        {this.state.section.map(item => (
                            <div key={item.section} className={item.class ? 'tab active' : 'tab'}
                                 onClick={() => this.changeSection(item)}>{item.name}</div>
                        ))}
                        {this.state.months.map(item => (
                            <div key={item.id} className={item.class ? 'tab active' : 'tab'}
                                 onClick={() => this.changeMonth(item)}>{item.name}</div>
                        ))}
                    </div>
                </div>
                {this.state.meeting.map((meeting, index) => (
                    <div key={meeting.id}>
                        {/*<div className="kind_list">*/}
                        {/*{meeting.name}*/}
                        {/*</div>*/}
                        {(meeting.section === this.state.currentSection) && (meeting.month !== "undefine" ? (meeting.month === this.state.monthId) : true) ?
                            <div className="kind_list">
                                <div data-month={meeting.month}
                                     className={meeting.liveType ? meeting.liveType + ' navigator_list' : 'navigator_list'}>
                                    <div className="text" data-id={meeting.id}>
                                        <div className="time">{meeting.formatTime}
                                            {meeting.liveType === 'ongoing' ?
                                                <span>{meeting.typeName}</span>
                                                : ''
                                            }
                                        </div>
                                        <div className='meetingName'>{meeting.name}</div>
                                    </div>
                                    <div className='btn_box'>
                                        {
                                            meeting.exam.length === 0 && meeting.courseware.length === 0 && meeting.video.length === 0 ?
                                                ''
                                                :
                                                <Button className="button"
                                                        onClick={() => this.showCourseware(meeting, index)}>
                                                    <span>展开学习</span>
                                                    <Icon type={this.state.showModal ? 'up' : 'down'} size="md"></Icon>
                                                </Button>
                                        }
                                        {
                                            meeting.liveType === 'meeting' && (meeting.type !== 4) ?
                                                <span>
                                                    <Button className='button'
                                                            onClick={() => this.leave(meeting, index)}>{meeting.progress.meeting === 0 ? '请假' : (meeting.progress.meeting === -1 ? '已请假' : '已出勤')}</Button>
                                                <span className="stat">{meeting.statusName}</span>
                                                </span>
                                                : ''
                                        }
                                        {
                                            meeting.liveType !== 'meeting' ?
                                                <Button
                                                    className={meeting.liveType ? meeting.liveType + ' button' : 'button'}
                                                    onClick={() => this.goWhere(meeting)}>{meeting.statusName}</Button>
                                                : ''
                                        }
                                        {meeting.exam.length === 0 && meeting.courseware.length === 0 && meeting.video.length === 0 ?
                                            ''
                                            : <div
                                                className="stat">已完成 {meeting.finishedAllCount}/{meeting.exam.length + meeting.courseware.length + meeting.video.length}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            : ''
                        }
                    </div>
                ))}
                <Modal
                    popup
                    visible={this.state.showModal}
                    onClose={() => this.onClose()}
                    animationType="slide-up"
                    className="meeting_modal"
                >
                    <div className="modal_content" style={{
                        maxHeight: this.state.pageHeight,
                        overflowY: 'auto'
                    }}>
                        <div>
                            <div className="modal_title">课件</div>
                            <div className="modal_body">
                                <Steps>
                                    {this.state.arrays.map(key => (
                                        key.map(obj => (
                                            obj.type === 'exam' ?
                                                <Step title={obj.name ? obj.name : obj.id} key={obj.id}
                                                      icon={customIcon()}
                                                      description={obj.finished ? obj.count + '道题，已做' : obj.count + '道题，未做'}
                                                      status={obj.finished ? 'finish' : 'wait'}
                                                      onClick={() => this.stepWhere(obj)}/>
                                                :
                                                <Step title={obj.name ? obj.name : obj.id} key={obj.id}
                                                      icon={customIcon()}
                                                      description={obj.finished ? '已看' : '未看'}
                                                      status={obj.finished ? 'finish' : 'wait'}
                                                      onClick={() => this.stepWhere(obj)}/>
                                        ))
                                    ))}
                                </Steps>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}