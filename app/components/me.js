import React from 'react';
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
	Tabs
} = antdMobile;
import '../assets/css/me.less';


const Item = List.Item;
const Brief = Item.Brief;

export default class Me extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: '我的',
			data: [
				{
					id: 1,
                    type: 'note',
					name: '我的笔记',
					thumb: '//zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
				},
				{
					id: 2,
					type: 'issue',
                    name: '我的答疑',
					thumb: '//zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
				},
				{
					id: 3,
					type: 'downLoad',
                    name: '离线下载',
					thumb: '//zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'
				},
                {
                    id: 4,
					type: 'errorGather',
                    name:'我的错题集',
                    thumb: '//zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'
                },
                {
                    id: 5,
					type: 'weekReport',
                    name:'每周学习报告',
                    thumb: '//zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'
                },
                {
                    id: 6,
					type: 'order',
                    name:'导师预约',
                    thumb: '//zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'
                },
                {
                    id: 7,
                    type: 'set',
                    name: '设置',
                    thumb: '//zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png'
                }
			],
			height: document.documentElement.clientHeight - (gaodun_callback.Config.app?0:50)
		};
	}

	componentWillMount() {
		let nickname = '';
		gaodun_callback.GetData.UserInfo(function (resp) {
			nickname = resp.nickname;
		});
		this.setState({
			nickname: nickname
		})
	}
	componentDidMount() {

	}
	handleClick = (i) => {
		let type = i.type;
		if(type === 'order'){
            this.props.history.push({
                pathname: `/me/${type}/create`
            })
			return;
		}
        this.props.history.push({
            pathname: `/me/${type}`
        })
	};
	render() {
		const {nickname} = this.state;
		return (
			<div className="me_box" style={{height: this.state.height+'px',overflow:'auto'}}>
				<WingBlank>
					<WhiteSpace size="lg"/>
					<div className='header'>
						<div className='info'>
							<div>{nickname}</div>
							<span>查看并编辑个人资料</span>
						</div>
                        <img src="//zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" alt=""/>
						<div className='set_date'>
							设置考试日期，目标110
						</div>
					</div>
                    <List className="me_list">
                        {this.state.data.map(i => (
                            <Flex key={i.id}>
                                <Flex.Item>
                                    <Item
                                        key={i.id}
                                        thumb={i.thumb}
                                        multipleLine
                                        onClick={() => this.handleClick(i)}>
                                        {i.name}
                                    </Item>
                                </Flex.Item>
                            </Flex>
                        ))}
                    </List>
				</WingBlank>
			</div>
		);
	}
}