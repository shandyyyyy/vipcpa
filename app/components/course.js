import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
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
    Tabs,
    ActivityIndicator
} = antdMobile;
import '../assets/css/course.less';

import CourseList from './course/courseList';
import PpLive from './course/ppLive';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

const tabs = [
    {title: "课程"},
    {title: "直播表"}
];


export default class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '课程'
        };
    }

    componentWillMount() {
        let {location} = this.props;
        let tabIndex = 0;
        let left = '5%';
        if(location.pathname === '/index/course'){
            tabIndex =  0;
        }
        if(location.pathname === '/index/course/ppLive'){
            tabIndex =  1;
            left = '30%';
        }
        this.setState({
            tabIndex: tabIndex,
            left: left
        })
    }

    componentDidMount() {
        this.setState({
            pageHeight: document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop - 45 - (gaodun_callback.Config.app?0:50),
        })
    }
    changeTab(index){
        const {location} = this.props;
        let name='';
        if(index === 0){
            this.state.left = '5%';
        }else{
            this.state.left = '30%';
            name = 'ppLive';
        }
        if(name === '' && `/index/course` !== location.pathname){
            this.props.history.push({
                pathname: `/index/course`
            })
            return;
        }
        if(`/index/course/${name}` !== location.pathname){
            this.props.history.push({
                pathname: `/index/course/${name}`
            })
        }
        this.setState({
            left:this.state.left
        })
    }
    render() {
        return (
            <div className="course" >
                <WhiteSpace size="lg"/>
                <div className="course_tabs" ref={el => this.lv = el}>
                    <Tabs tabs={tabs}
                          initialPage={this.state.tabIndex}
                          tabBarUnderlineStyle={{borderColor:'#008489',left:this.state.left}}
                          tabBarActiveTextColor="#008489"
                          swipeable={false}
                          onChange={(tab, index) => {
                              this.changeTab(index);
                          }}
                          onTabClick={(tab, index) => {
                              this.changeTab(index);
                          }}
                    >
                        <div style={{height: this.state.pageHeight, backgroundColor: '#fff', overflow:'auto'}} >
                            <Route path='/index/course' component={CourseList}/>
                        </div>
                        <div style={{height: this.state.pageHeight, backgroundColor: '#fff', overflow:'auto'}}>
                            <Route path='/index/course/ppLive' component={PpLive}/>
                        </div>
                    </Tabs>
                </div>
                <WhiteSpace size="lg"/>
            </div>
        );
    }
}