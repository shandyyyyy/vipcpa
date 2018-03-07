import React from 'react';
import { WingBlank, WhiteSpace, NavBar, Icon, Picker, List, SearchBar, InputItem, Button, Flex } from 'antd-mobile';
import AutoComplete from '../../components/AutoComplete';
import { getChannel } from '../../api/agent';
import { getProject, selectAgent } from '../../api/product';
import '../../assets/css/product.less';


export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: [],
            channelValue: '',
            project: [],
            projectValue: '',
            agent: [], // 渠道商
            agentValue: ''
        };
    }

    handelBack = () => {
        this.props.history.push('/product');
    }

    handleChannelOk = val => {
        this.setState({
            channelValue: val
        });
    }

    handleProjectOk = val => {
        this.setState({
            projectValue: val
        });
    }

    // 渠道商模糊查找
    handleAgentChange = name => {
        this.setState({
            agentValue: name
        });
        // 获取渠道商
        name && selectAgent({
            name
        })
            .then(response => {
                this.setState({
                    agent: response.data
                });
            });
    }

    handleAgentSubmit = () => {
        console.log('handleAgentSubmit')
    }

    handleAgentCancel = () => {
        this.setState({
            agent: [],
            agentValue: ''
        });
    }

    handleAgentClick = agentValue => {
        this.setState({
            agent: [],
            agentValue
        })
    }

    componentDidMount() {
        // 获取渠道
        getChannel()
            .then(response => {
                this.setState({
                    channel: [response.data.map(item => ({
                        label: item.name,
                        value: item.id
                    }))]
                });
            });

        // 获取项目
        getProject()
            .then(response => {
                this.setState({
                    project: [response.data.map(item => ({
                        label: item.name,
                        value: item.id
                    }))]
                });
            });
    }

    render() {
        return (
            <div>
                <NavBar
                    leftContent={<Icon type="left"></Icon>}
                    rightContent={<Icon type="search"></Icon>}
                    onLeftClick={this.handelBack}
                >
                    商品搜索
                </NavBar>
                <WingBlank>
                    <Picker
                        data={this.state.channel}
                        value={this.state.channelValue}
                        onOk={this.handleChannelOk}
                        cascade={false}
                        cols={1}
                    >
                        <List.Item arrow="horizontal">渠道</List.Item>
                    </Picker>
                    {/* <SearchBar
                        placeholder="渠道商"
                        onChange={this.handleAgentChange}
                        onSubmit={this.handleAgentSubmit}
                        onCancel={this.handleAgentCancel}
                        value={this.state.agentValue}
                    />
                    <Flex wrap="wrap">
                        {this.state.agent.map(item => (
                            <span
                                key={item.id}
                                onClick={e => this.handleAgentClick(item.name, e)}
                                className="tag"
                            >
                                {item.name}
                            </span>
                        ))}
                    </Flex> */}
                    <AutoComplete
                        placeholder="渠道商"
                        onSubmit={this.handleAgentSubmit}
                    />
                    <Picker
                        data={this.state.project}
                        value={this.state.projectValue}
                        onOk={this.handleProjectOk}
                        cascade={false}
                        cols={1}
                    >
                        <List.Item arrow="horizontal">项目</List.Item>
                    </Picker>
                    <InputItem
                        clear
                        placeholder="auto focus"
                    >标题</InputItem>
                    <WhiteSpace />
                    <Button type="ghost">搜索</Button>
                </WingBlank>
            </div>
        );
    }
}