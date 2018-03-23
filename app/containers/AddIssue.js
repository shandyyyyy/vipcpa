import React from 'react';
import antdMobile from 'antd-mobile';
const {
    WingBlank,
    WhiteSpace,
    NavBar,
    Icon,
    Button,
    Toast
} = antdMobile;

import '../assets/css/addIssue.less';


export default class AddIssue extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: '',
            subject: [],
            subjectIndex: 0,
        };
    }

    componentDidMount() {
        let groupID = 27;
        gaodun_callback.Group.querySubject((resp) => {
            if (resp.status === 0) {
                let subject = resp.result;
                gaodun_callback.Data.subjectMap = subject;
                gaodun_callback.Methods.saveData();
                let arr = [];
                Object.keys(subject).map(key => {
                    let obj = {};
                    obj.id = key;
                    obj.name = subject[key];
                    obj.active = '';
                    arr.push(obj);
                    this.setState({
                        subject: arr
                    })
                })
            }else{
                Toast.info('获取科目失败', 1);
            }
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    onLeftClick = () => {
        this.props.history.push('/index/room');
    };
    chooseSubject = (index) => {
        const {subject} = this.state;
        subject.forEach((item, index) => {
            subject[index].active = '';
        });
        subject[index].active = 'active';

        this.setState({
            subject: subject,
            subjectIndex: subject[index].id
        });
    };

    askQuestion = () => {
        const {value} = this.state;
        const {subjectIndex} = this.state;
        if (value.length === 0) {
            Toast.info('请描述你的问题', 1);
        }
        else if (subjectIndex === 0) {
            Toast.info('请选择科目提交问题', 1);
        } else {
            let classID = 2222;
            let meetingID = 28703;
            let type= 5;
            let y = new Date().getFullYear();
            let m = gaodun_callback.Methods.n2s( (new Date().getMonth())+1 ) ;
            let key = y +''+ m;
            let subKey = subjectIndex;
            let question = value;
            gaodun_callback.Class.askQuestion(classID, meetingID, type, key, subKey, question, (resp)=>{
                if(resp.status === 0){
                    Toast.success('提交成功',1 ,()=>{
                        this.props.history.push({
                            pathname:'/index/room/myIssue'
                        });
                    });
                }else{
                    Toast.fail('提交失败', 1);
                }
            })
        }
    };

    render() {
        return (
            <div className="addIssue">
                <NavBar
                    mode="dark"
                    className="navbar"
                    leftContent={<Icon type="cross"></Icon>}
                    onLeftClick={this.onLeftClick}
                    rightContent={<span onClick={() => this.askQuestion()} className="add">提交</span>}>
                    提问
                </NavBar>
                <WingBlank>
                    <WhiteSpace size="lg"/>
                    <div className="subject">
                        {this.state.subject.map((item, index) => (
                            <Button type="ghost" inline size="small"
                                    className={item.active ? 'active button' : 'button'} key={item.id}
                                    onClick={() => this.chooseSubject(index)}>{item.name}</Button>
                        ))}
                    </div>
                    <WhiteSpace size="lg"/>
                    <div className="line"></div>
                    <WhiteSpace/>
                    <div className="textArea">
                        <textarea
                            rows={8}
                            placeholder="输入我的问题"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </div>
                </WingBlank>

            </div>

        );
    }
}