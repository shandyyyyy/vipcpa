import React from 'react';
import ReactDOM from 'react-dom';
import {
    WingBlank,
    WhiteSpace,
    NavBar,
    Icon,
    ListView
} from 'antd-mobile';
import '../assets/css/room.less';

const NUM_ROWS = 20;
let pageIndex = 0;

const data = [
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
    }
];

function MyBody(props) {
    return (
        <WingBlank>
            <div className="my_body listScroll">
                <span style={{display: 'none'}}>you can custom body wrap element</span>
                {props.children}
            </div>
        </WingBlank>
    );
}

export default class TopListPage extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax
        setTimeout(() => {
            this.rData = data;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data),
                isLoading: false,
                height: hei,
            });
        }, 600);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({isLoading: true});

        setTimeout(() => {
            this.rData = data.concat(data);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    };

    onLeftClick = () => {
        this.props.history.push('/index/room');
    };

    render() {

        let index = 0;
        const row = () => {
            if (data.length === 0) {
                console.log("数组长度为0");
            }
            const obj = data[index++];
            // console.log(obj);
            return (
                <div key={obj.id} className="top_list">
                    <WhiteSpace size="lg"/>
                    <div className="title">
                        <img src="" alt=""/>
                        <div className="title_right">
                            <div className="nickname">{obj.id}nickname</div>
                            <div className="time">time <i>审计</i></div>
                        </div>
                    </div>
                    <WhiteSpace size="lg"/>
                    <div className="body">
                        老师，我想问一下，当集团的会计在给整个集团编报表的时候，需要考虑税费吗？还要去税务局交税吗？谢谢老师
                    </div>
                    <WhiteSpace size="lg"/>
                    <div className="answer">
                        <span>老师：</span>
                        同学，你好！不需要！考虑递延的就好！
                    </div>
                    <WhiteSpace size="lg"/>
                </div>
            );
        };
        return (
            <div className="room">
                <NavBar
                    mode="dark"
                    className="navbar"
                    leftContent={<Icon type="cross"></Icon>}
                    onLeftClick={this.onLeftClick}>
                    精华列表
                </NavBar>
                <div className="topList_box">
                </div>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    // renderHeader={() => <span>header</span>}
                    renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderBodyComponent={() => <MyBody/>}
                    renderRow={row}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    pageSize={4}
                    onScroll={() => {
                        console.log('scroll');
                    }}
                    scrollRenderAheadDistance={50}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={20}
                />
            </div>

        );
    }
}