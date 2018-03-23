/*import React from 'react';
import ReactDOM from 'react-dom';*/
import {Route} from 'react-router-dom';
import antdMobile from 'antd-mobile'
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
    Card,
    Tag,
} = antdMobile;
import '../assets/css/base.less';
import '../assets/css/room.less';
import TopList from './room/topList';
import Report from './room/report';
import Interaction from './room/interaction';
import MyIssue from "./room/myIssue";

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

const tabs = [
    {title: "精华提问"},
    {title: "我的提问"},
    {title: "战报"},
    {title: "互动"},
];


export default class Room extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '自习室',
            tabIndex: 0,
            height: document.documentElement.clientHeight - 45 - 50 - 25,
            left: 5,
            data: [
                {
                    id: 1,
                    finished: false,
                    label: 'basketball basketballbasketballbasketballbasketball',
                    brief: 'details',
                    extra: false,
                    thumb: '//zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
                },
                {
                    id: 2,
                    finished: false,
                    label: 'football',
                    brief: 'details',
                    extra: true,
                    thumb: '//zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
                },
                {
                    id: 3,
                    finished: true,
                    label: 'football',
                    brief: 'details',
                    extra: true,
                    thumb: '//zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'
                },
            ]
        };
    }

    componentWillMount() {
        let {location} = this.props;
        let tabIndex = 0;
        let left = 5;
        if(location.pathname === '/index/room'){
            tabIndex =  0;
        }
        if(location.pathname === '/index/room/myIssue'){
            tabIndex =  1;
            left = 30;
        }
        if(location.pathname === '/index/room/report'){
            tabIndex =  2;
            left = 55;
        }
        if(location.pathname === '/room/interaction'){
            tabIndex =  3;
            left = 80;
        }
        this.setState({
            tabIndex: tabIndex,
            left: left
        })
    }

    componentDidMount() {
        this.setState({
            height: document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop - 50 -45
        })
    }

    tabClick = (index) => {
        let {location} = this.props;
        let name='';
        let left = 5;
        switch (index){
            case 0:
                left = 5;
                break;
            case 1:
                name="myIssue";
                left = 30;
                break;
            case 2:
                name="report";
                left = 55;
                break;
            case 3:
                name = "interaction";
                left = 80;
                break;
            default:
                break;
        }
        if(name === '' && `/index/room` !== location.pathname){
            this.props.history.push({
                pathname: `/index/room`
            })
            return;
        }
        if(index === 3 && `/room/${name}` !== location.pathname){
            this.props.history.push({
                pathname: `/room/${name}`
            })
            return;
        }

        if(`/index/room/${name}` !== location.pathname){
            this.props.history.push({
                pathname: `/index/room/${name}`
            })
        }
        this.setState({
            left: left,
        });
    };

    render() {
        const {match} = this.props;
        return (
            <div className="room">
                <WingBlank>
                    <WhiteSpace size="lg"/>
                    <Flex className="title">
                        <Flex.Item className="left">自习室</Flex.Item>
                        <Flex.Item className="right">
                            <p>在线人数</p>
                            <p className="time">157</p>
                        </Flex.Item>
                        <Flex.Item className="right">
                            <p>同班在线</p>
                            <p className="time">17</p>
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace size="lg"/>
                </WingBlank>
                <Tabs tabs={tabs}
                      ref={el => this.lv = el}
                      initialPage = {this.state.tabIndex}
                      tabBarActiveTextColor="#008489"
                      tabBarUnderlineStyle={{borderColor:'#008489',left:this.state.left+'%'}}
                      onChange={(tab,index) => {
                          this.tabClick(index);
                      }}
                      onTabClick={(tab,index) => {
                         this.tabClick(index);
                      }}
                >

                    <div style={{height: this.state.height+'px', }}>
                        <Route exact path={match.url} component={TopList}/>
                        {/*<TopList history={this.props.history}/>*/}
                    </div>
                    <div style={{height: this.state.height+'px'}}>
                        <Route path={`${match.url}/myIssue`} component={MyIssue} />
                        {/*<IssueList height={this.state.height} page={"myIssue"}/>*/}
                    </div>
                    <div style={{height: this.state.height+'px' }}>
                        <Route path={`${match.url}/report`} component={Report}/>
                        {/*<Report />*/}
                    </div>
                    <div style={{height: this.state.height+'px'}}>
                        <Route path={`/room/interaction`} component={Interaction}/>
                    </div>
                </Tabs>
            </div>
        );
    }
}
