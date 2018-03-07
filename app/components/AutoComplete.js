import React from 'react';
import { SearchBar, Flex } from 'antd-mobile';
// import '../../assets/css/product.less';


// 带输入建议的输入框
export default class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [], // 输入建议
            value: '' // 输入框的值
        };
    }

    handleChange = value => {
        this.setState({
            value
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

    handleSubmit = () => {
    }

    handleCancel = () => {
        this.setState({
            suggestions: [],
            value: ''
        });
    }

    handleClick = value => {
        this.setState({
            suggestions: [],
            value
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <SearchBar
                    {...this.props}
                    // onChange={this.handleChange}
                    // onSubmit={this.handleSubmit}
                    // onCancel={this.handleCancel}
                    // value={this.state.agentValue}
                />
                <Flex wrap="wrap">
                    {this.state.suggestions.map(item => (
                        <span
                            key={item.id}
                            onClick={e => this.handleClick(item.name, e)}
                            className="tag"
                        >
                            {item.name}
                        </span>
                    ))}
                </Flex>
            </div>
        );
    }
}