import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import antdMobile from 'antd-mobile';
const {
    WingBlank,
    WhiteSpace,
    Icon,
    Modal,
    Flex,
    Calendar,
    Button
} = antdMobile;
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

import '../../assets/css/base.less';
import '../../assets/css/course.less';

const extra = {};

const now = new Date();
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = {info: 'Disable', disable: true};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = {info: 'live'};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = {info: 'Disable', disable: true};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = {info: 'Disable', disable: true};
// console.log(extra);
Object.keys(extra).forEach((key) => {
    const info = extra[key];
    const date = new Date(key);
    if (!Number.isNaN(+date) && !extra[+date]) {
        extra[+date] = info;
    }
});

export default class PpLive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            en: false,
            show: true,
            config: {
                locale: zhCN
            },
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    getDateExtra = date => extra[+date];

    render() {
        return (
            <WingBlank>
                <WhiteSpace size='lg'/>
                <WhiteSpace size='lg'/>

                <Calendar
                    {...this.state.config}
                    visible={this.state.show}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                    getDateExtra={this.getDateExtra}
                    defaultDate={new Date()}
                    defaultValue={ [new Date(), new Date()] }
                    type='one'
                    renderHeader={() => ''}
                    minDate={new Date(+now - 5184000000)}
                    maxDate={new Date(+now + 31536000000)}
                />
            </WingBlank>
        );
    }
}