import React from 'react';
import antdMobile from 'antd-mobile';

const {Modal, Button, Radio, Checkbox, NavBar, Icon} = antdMobile;
import '../../../assets/css/errorsGather.less';

const RadioItem = Radio.RadioItem;

export default class ErrorModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalData: {},
            userAnswer: [],
            option: -1,
            minQuestionIndex: 0,
        }
    }

    componentWillMount() {
        this.state.modalData = this.props.location.state;
        this.initUserAnswer();
    }

    // 初始化用户答案
    initUserAnswer = () => {
        let question = this.state.modalData.value;
        let num = this.state.minQuestionIndex;
        // if ((question.choice === undefined) || (question.choice.length === 0)) {
        //     return;
        // }
        let choice = [];
        if (((question.choice === undefined) || (question.choice.length === 0)) && question.type !== 5) {
            return;
        }
        else if (question.type !== 5) {
            choice = question.choice;

        }else {
            let t = question.question[num].type;
            if (t === 1 || t === 2 || t === 3 || t === 7) {
                choice = question.question[num].choice;
            } else {
                return;
            }
        }
        let arr = [];
        choice.forEach((item, index) => {
            let obj = {};
            obj.option = item.option;
            obj.value = index;
            obj.isChecked = false;
            arr.push(obj);
        });
        this.setState({userAnswer: arr});
    };

    // 关闭弹窗
    closeModal = () => {
        this.props.closeModal();
    };

    // 提交答案
    submitAnswer = () => {
        const {userAnswer} = this.state;
        console.log(userAnswer);

        let modalData = {
            visible: this.state.modalData.visible,
            title: '又答错了╭(╯_╰)╭ ',
            value: {
                analysis: this.state.modalData.value.analysis,
                questionTypes: this.state.modalData.value.questionTypes,
                // answer:'',
                body: this.state.modalData.value.body,
                choice: this.state.modalData.value.choice,
                type: this.state.modalData.value.type,
                rightAnswer: this.state.modalData.value.rightAnswer,
                isGoOn: false,
            }
        };

        this.setState({modalData: modalData})
    };

    // 综合题
    renderComprehensive = () => {
        let data = this.state.modalData.value;
        if (data.type === 5) {
            let num = this.state.minQuestionIndex;
            let q = data.question;
            return (
                <div className="comprehensive">
                    {q.map((item, index) => (
                        <Radio className={num === index ? 'checked' : ''} key={index} checked={num === index}
                               onChange={() => this.changeComprehensiveIndex(index)}> {index + 1}</Radio>
                    ))}
                    <div className="comprehensive-body">
                        {
                            (q[num].body).map((item, index) => (
                                <p key={index}>
                                    {this.checkContent(item)}
                                </p>
                            ))
                        }
                    </div>

                    {this.renderChoice(q[num].choice)}
                    {this.renderChoose(q[num])}
                    {this.renderAnswer(q[num])}
                    {this.renderAnalysis(q[num])}
                </div>
            )
        } else {
            return null
        }
    };

    // 综合题小题切换
    changeComprehensiveIndex = (index) => {
        let choice = this.state.modalData.value.question[index].choice;
        let arr = [];
        choice.forEach((item, index) => {
            let obj = {};
            obj.option = item.option;
            obj.value = index;
            obj.isChecked = false;
            arr.push(obj);
        });
        this.setState({
            minQuestionIndex: index,
            userAnswer: arr
        });
    };

    // 选项
    renderChoice = (data) => {
        if ((data === undefined) || (data.length === 0)) {
            return null
        } else {
            return (
                <div className="questionChoice">
                    {
                        data.map((item, index) => (
                            <p key={index}>
                                <span>{item.option}、</span>
                                {this.checkContent(item.answer)}
                            </p>
                        ))
                    }
                </div>
            )
        }
    };
    // 查看题目--正确答案
    renderAnswer = (data) => {
        let question = this.state.modalData.value;
        if (data.type !== 5) {
            if ((!question.isDo) || (!question.isGoOn)) {
                return (
                    <div className="questionAnswer">
                        <p className="answerText">正确答案:</p>
                        {
                            (data.rightAnswer).map((item, index) => (
                                <p key={index} className="answer">
                                    {this.checkContent(item)}
                                </p>
                            ))
                        }
                    </div>
                )
            }
        }
    }
    // 查看题目--题目解析
    renderAnalysis = (data) => {
        // 不可做题 或者 不可继续做题 非综合题
        let question = this.state.modalData.value;
        if (data.type !== 5) {
            if ((!question.isDo) || (!question.isGoOn)) {
                return (
                    <div className="questionAnalysis">
                        <p className="analysisText">答案解析:</p>
                        {
                            (data.analysis).map((item, index) => (
                                <p className="analysis" key={index}>
                                    {this.checkContent(item)}
                                </p>
                            ))
                        }
                    </div>
                )
            }
        }
    }
    // 做题目--选择框
    renderChoose = (data) => {
        console.log(data);
        let question = this.state.modalData.value;
        if ((question.isDo) && (question.isGoOn)) {
            if (data.type !== 5) {
                return (
                    <div className="questionChoose">
                        {this.checkQuestionType(data.type)}
                    </div>
                )
            }
        } else {
            return null
        }
    }

    // 题目类型
    checkQuestionType = (type) => {
        const {userAnswer} = this.state;
        const {option} = this.state;
        console.log(userAnswer);
        // 单选、判断： Radio  多选、不定项：Checkbox
        console.log(userAnswer);
        if (type === 1 || type === 3) {
            return (
                <div>
                    {userAnswer.map(item => (
                        <Radio className={option === item.value ? 'checked' : ''} key={item.value}
                               checked={option === item.value}
                               onChange={() => this.changeSingleChoice(item.value)}> {item.option}</Radio>
                    ))}
                </div>
            )
        } else if (type === 2 || type === 7) { // 多选、不定项
            return (
                <div className="checkbod-group">
                    {
                        userAnswer.map((item, index) => (
                            <Checkbox key={item.value} className={item.isChecked ? 'checked' : ''} onChange={() => {
                                this.changeMultipleChoice(index)
                            }}>{item.option}</Checkbox>
                        ))
                    }
                </div>
            )
        }
    }

    // 单选、判断
    changeSingleChoice = (value) => {
        const {userAnswer} = this.state;
        userAnswer.forEach((item) => {
            item.isChecked = false;
            if (item.value === value) {
                item.isChecked = true;
            }
        })

        this.setState({
            userAnswer: userAnswer,
            option: value
        })
    }

    // 多选、不定项
    changeMultipleChoice = (index) => {
        const {userAnswer} = this.state;
        userAnswer[index].isChecked = !userAnswer[index].isChecked;
        this.setState({
            userAnswer: userAnswer
        })
    }

    // 检查内容是否为图片
    checkContent = (data) => {
        let isImg = data.toLocaleLowerCase();
        if ((isImg.indexOf("data:image/") === 0) || (isImg.indexOf('http://') === 0) || (isImg.indexOf('https://') === 0) || (isImg.indexOf('//') === 0)) {
            return (<img src={data}/>)
        } else {
            return (<span>{data}</span>)
        }
    }

    onLeftClick = () => {
        this.props.history.push('/me/errorGather');
    };

    render() {

        let question = this.state.modalData.value;
        return (
            <div className="errorModal">
                <NavBar
                    mode="light"
                    className="navbar"
                    leftContent={<Icon type="left"></Icon>}
                    onLeftClick={this.onLeftClick}
                    rightContent={(question.isDo) && (question.isGoOn) ?
                        <span onClick={() => this.submitAnswer()} className="add">提交</span> : ''}>
                    {(question.isDo) && (question.isGoOn) ? '练一练' : '错题回顾'}
                </NavBar>
                <div style={{height: '45px'}}></div>

                <div className="content">
                    <p className="content-title">
                        <span className="classify">审计</span>
                        <span className="questionType">{question.questionTypes}</span>
                    </p>
                    <div className="content-question">
                        <div className="questionBody">
                            {
                                (question.body).map((item, index) => (
                                    <p key={index}>
                                        {this.checkContent(item)}
                                    </p>
                                ))
                            }
                        </div>
                        {this.renderComprehensive()}
                        {this.renderChoice(question.choice)}
                        {this.renderChoose(question)}
                        {this.renderAnswer(question)}
                        {this.renderAnalysis(question)}
                    </div>
                </div>
            </div>
        )
    }
}