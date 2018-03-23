import React from 'react';
import {Route} from 'react-router-dom';
import antdMobile from 'antd-mobile';
const {
    WingBlank,
    WhiteSpace,
    NavBar,
    List,
    Icon,
    Toast,
    Tabs,
    Picker,
    InputItem
} = antdMobile;
import '../../assets/css/base.less';
import '../../assets/css/me.less';
import OrderList from './orderList';
import CreateOrder from  './createOrder';

const tabs = [
    {title: "导师预约"},
    {title: "预约列表"},
];

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupID: 27,
            tabIndex: 0,
            pageHeight: document.documentElement.clientHeight - 45 - 50,
        };
    }

    componentWillMount() {
        let {location} = this.props;
        let tabIndex = 0;
        let left = '3%';
        if(location.pathname === '/me/order/create'){
            tabIndex =  0;
            left = '3%';
        }
        if(location.pathname === '/me/order/list'){
            tabIndex =  1;
            left = '27%';
        }
        this.setState({
            tabIndex: tabIndex,
            left: left
        });
    }

    componentDidMount() {

    }

    tabClick = (index) => {
        this.setState({
            tabIndex: index,
            left: index === 1 ? '27%' : '3%'
        },()=>{
            if(index === 0){
                this.props.history.push({
                    pathname: `/me/order/create`
                })
            }else{
                this.props.history.push({
                    pathname: `/me/order/list`
                })
            }
        })
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
                        <WingBlank>
                            <WhiteSpace size='lg'/>
                            <WhiteSpace size='lg'/>
                            <Route path='/me/order/create' component={CreateOrder}/>
                            {/*<CreateOrder />*/}
                        </WingBlank>
                    </div>

                    <div
                        style={{height: this.state.pageHeight + 'px', backgroundColor: '#fff', overflow: 'hidden'}}>
                        <WingBlank>
                            <WhiteSpace size='lg'/>
                            <WhiteSpace size='lg'/>
                            <Route path='/me/order/list' component={OrderList}/>
                            {/*<OrderList subjectMap={this.state.subjectMap}/>*/}
                        </WingBlank>
                    </div>
                </Tabs>
            </div>
        );
    }
}
