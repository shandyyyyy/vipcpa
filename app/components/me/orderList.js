import React from 'react';
import {Route} from 'react-router-dom';
import {
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
} from 'antd-mobile';
import '../../assets/css/base.less';
import '../../assets/css/room.less';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

const tabs = [
    {title: "导师预约"},
    {title: "预约列表"},
];


export default class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '预约'
        };
    }

    componentWillMount() {
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='orderList'>
                <WhiteSpace size='lg'/>
                <section className='card'>
                    <p>status</p>
                    <div className='info'>
                        <p>会计 撒大声地</p>
                        <p className='status'>评价</p>
                    </div>
                </section>
                <section className='card'>
                    <p>status</p>
                    <div className='info'>
                        <p>会计 撒大声地</p>
                        <p className='status'>评价</p>
                    </div>
                </section>
            </div>
        );
    }
}
