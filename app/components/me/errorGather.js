// 错题集
import React from 'react';
import antdMobile from 'antd-mobile';

const {Radio, Toast, NavBar, Icon, Button, Modal} = antdMobile;

import '../../assets/css/errorsGather.less';

const RadioItem = Radio.RadioItem;
const alert = Modal.alert;

export default class ErrorsGather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioOption: {
                defaultValue: 0,
                value: [
                    {
                        id: 0,
                        name: '全部',
                        active: true
                    },
                    {
                        id: 1,
                        name: '会计',
                        active: false
                    },
                    {
                        id: 2,
                        name: '审计',
                        active: false
                    },
                ]
            },

            errors: [
                {
                    id: 1,
                    type: 1,
                    body: ["A bank quotes a stated annual interest rate of 4.00%. If that rate is equal to an effective annual rate of 4.08%, then the bank is compounding interest:"],
                    choice: [{
                        option: "A",
                        answer: "Daily"
                    }, {
                        option: "B",
                        answer: "Quarterly"
                    }, {
                        option: "C",
                        answer: "Semiannually"
                    }],
                    answer: "100",
                    analysis: ["A is correct. The effective annual rate (EAR) when compounded daily is 4.08%.", "EAR = (1 + Periodic interest rate)m – 1", "EAR = (1 + 0.04/365)365 – 1", "EAR = (1.0408) – 1 = 0.04081 ≈ 4.08%."],
                    rightAnswer: ["A"],
                    questionTypes: "单选题",
                    classify: 1,
                    numberOfErrors: 1,
                    isDo: true,
                    isGoOn: true,
                },
                {
                    "id": 2,
                    "type": 2,
                    "body": ["下列组织的会计，属于非营利组织会计范畴的有（   ）。"],
                    "choice": [{
                        "option": "A",
                        "answer": "财政部"
                    }, {
                        "option": "B",
                        "answer": "社会团体"
                    }, {
                        "option": "C",
                        "answer": "会计师事务所"
                    }, {
                        "option": "D",
                        "answer": "基金会"
                    }],
                    "answer": "0101",
                    "analysis": ["【解析】民间非营利组织包括依照国家法律、行政法规在民政部门登记的社会团体、基金会、民办非企业单位。"],
                    "rightAnswer": ["B", "D"],
                    "questionTypes": "多选题",
                    classify: 1,
                    numberOfErrors: 4,
                    isDo: true,
                    isGoOn: true,
                },
                {
                    "id": 3,
                    "type": 3,
                    "body": ["“业务活动成本”科目的借方反应当期业务活动成本的实际发生额。在会计期末，应当将该科目当期借方发生额转入“非限定性净资产”科目，期末结转后该科目应无余额。（      ）"],
                    "choice": [{
                        "option": "A",
                        "answer": "对"
                    }, {
                        "option": "B",
                        "answer": "错"
                    }],
                    "answer": "10",
                    "analysis": ["【解析】见教材。"],
                    "rightAnswer": ["A"],
                    "questionTypes": "判断题",
                    classify: 2,
                    numberOfErrors: 4,
                    isDo: true,
                    isGoOn: true,
                },
                {
                    id: 4,
                    gaodunQuestionID: 509732,
                    type: 4,
                    body: ["Define JIT and identify the role of it."],
                    choice: "",
                    answer: "请查看答案解析",
                    analysis: ["JIT lean production, is a demand-pull production system, manufacturing each component in a production line as soon as possible, only when it is needed by the next step of production line", "The role of JIT:", "Obvious production priorities", "Reduced setup and manufacturing lead time", "No overproduction occurrences", "Improved quality control (faster feedback) and less material waste", "Easier inventory control (low or even zero inventory)", "Less paperwork", "Strong supplier relationships", "High quality products and zero defects.", "​"],
                    rightAnswer: ["请查看答案解析"],
                    questionTypes: "填空题",
                    classify: 2,
                    numberOfErrors: 4,
                    isDo: false,
                    isGoOn: false,
                },
                {
                    "id": 6,
                    "type": 6,
                    "body": ["Charlene Roberts is the controller for PARKCO, a company that owns and operates several parking garages in a large Midwestern American city. Recently, the management of PARKCO has been investigating the viability of building a parking garage in an area of the city that has experienced rapid growth. Some years ago, PARKCO acquired the necessary land at a cost of $425,000, and had demolished worthless buildings on the land at a cost of $72,000. Since then, the land has been rented by various construction companies as a temporary storage site for building materials while the construction companies completed projects in the area.PARKCO has averaged revenue of $5,000 per year for this use of the property.", "Roberts is currently assembling financial information relating to the proposed garage. In addition to the information already presented, she received from the CFO, John Demming, the following projections:", "https://simg01.gaodunwangxiao.com/image/image/20161230/20161230085550_28820.jpg", "Roberts estimates the monthly variable cost of servicing each monthly parker is $12, and that the price of a monthly parking space would be $75. The estimated cost per daily parker is $2, and the daily parking rate is expected to be set at $8. The parking garage would operate 20 business days per month.", "Roberts believes, based on PARKCO’s past experience with similar garages, that the projected number of monthly and daily parkers was too high. When she questioned Demming he replied, “This garage is going to be built no matter what your past experiences are. Just use the figures I gave you.”", "Question:", "1.", "A.Define sunk cost and opportunity cost.", "B.Identify the sunk costs and opportunity costs which in the PARKCO scenario and show the amount of each.", "2.", "A.Define contribution margin.", "B.Using the data in the scenario, calculate pre-tax operating income. Show your calculations.", "3.Define relevant cost", "4.Identify the ethical principles that should guide the work of a management accountant.", "5.Identify the ethical standards that should guide the work of a management accountant.", "6.Roberts is uncomfortable with the implications of Demming’s statement and has turned to IMA’s Statement of Ethical Professional Practice for guidance.  According to this guidance,", "A.Describe how they would or would not apply in the circumstances described.", "B.Identify the steps Roberts should take to resolve this situation.", "7.What is CVP analysis."],
                    "choice": "",
                    "answer": "请查看解析",
                    "analysis": ["1.", "A.", "Sunk cost is cost already incurred, and thus is irrelevant to the decision at hand.", "Opportunity cost is the profit foregone (given up) by choosing one course of action over another.", "B.", "Sunk cost：The costs to buy and clear the land ($425,000 and $72,000) would be considered sunk costs, as they have already been incurred.", "Opportunity costs：The annual rent that from the construction companies (averaging $5000) would be considered opportunity costs going forward, because PARKCO would have to give them up.", "2.", "A.The difference between total revenues and total variable costs is called contribution margin", "B.", "monthly CM = 420 × ($75 - $12) = $26,460", "daily CM = 20 × 180 × ($8 - $2) = $21,600", "Total contribution margin = $26,460   $21,600 = $48,060", "Pre tax Operating Income", "= Total contribution margin - fixed cost = $48,060 - $30,000 = $18,060", "3.Relevant costs are expected future costs and it differ among the alternative courses of actions being considered.", "4.Honesty；Fairness；Objectivity；Responsibility", "5. Competence；Integrity；Credibility；Confidentiality", "6.", "A.", "Competence - Prepare complete and clear reports and recommendations after appropriate analysis of relevant and reliable information.", "Integrity - Communicate favorable as well as unfavorable information and professional judgment or opinions.", "Credibility - Disclose fully all information that could reasonably be expected to", "influence an intended user’s understanding of the reports, comments, and recommendations presented.", "Confidentiality - does not apply to this scenario", "B.\tIn order to resolve her conflict, she needs to follow her company’s policy if one exists. Next she needs to speak to her supervisor or next level above, in this case the CFO. She may need to elevate to the Board of Directors. She may need to discuss with an objective advisor, call ethics helpline, (IMA), or consult with an attorney", "7.\tCVP analysis is also called break-even point analysis. It is the tool for understanding the interaction of revenues with the fixed costs and variable costs. It illustrates how changes in assumptions about cost behavior and the relevant ranges may affect the relationships among revenues, variables, costs, and fixed costs at various production level."],
                    "rightAnswer": ["请查看解析"],
                    "questionTypes": "解答题",
                    classify: 1,
                    numberOfErrors: 4,
                    isDo: false,
                    isGoOn: false,
                },
                {
                    body: ["Use the following information to answer Q1 to 5", "The stock of Acme Inc. is currently traded at $80, the one-year call option on this stock with an exercise price of $80, assume the risk-free rate is 5%, and the size of an up-move is 1.2."],
                    question: [{
                        "id": 22,
                        "type": 1,
                        "body": ["1.The size of a down-move is most likely:"],
                        "choice": [{
                            "option": "A",
                            "answer": "0.2"
                        }, {
                            "option": "B",
                            "answer": "0.83"
                        }, {
                            "option": "C",
                            "answer": "Cannot be determined"
                        }],
                        "answer": "010",
                        "analysis": ["Down-move factor is the reciprocal of the up-move factor, that is, 1/1.2=0.83"],
                        "rightAnswer": ["B"],
                        "questionTypes": "单选题"
                    }, {
                        "id": 23,
                        "type": 1,
                        "body": ["2.The risk-neutral probability of an up-move is:"],
                        "choice": [{
                            "option": "A",
                            "answer": "0.59"
                        }, {
                            "option": "B",
                            "answer": "0.41"
                        }, {
                            "option": "C",
                            "answer": "Lack of information"
                        }],
                        "answer": "100",
                        "analysis": ["The probability of an up-move is calculated based on the size of the up and down moves and risk-free rate. The formula is", "https://www.gaodun.com/share/tiku/image/20161031/20161031151746_40280.png"],
                        "rightAnswer": ["A"],
                        "questionTypes": "单选题"
                    }, {
                        "id": 24,
                        "type": 1,
                        "body": ["3.The risk neutral probability of a down-move is:"],
                        "choice": [{
                            "option": "A",
                            "answer": "0.61"
                        }, {
                            "option": "B",
                            "answer": "0.41"
                        }, {
                            "option": "C",
                            "answer": "0.59"
                        }],
                        "answer": "010",
                        "analysis": ["The probability of a down move is 1 minus the probability of up-move, that is, 1-0.59=0.41."],
                        "rightAnswer": ["B"],
                        "questionTypes": "单选题"
                    }, {
                        "id": 25,
                        "type": 1,
                        "body": ["Calculate the value today of the call option using binomial tree."],
                        "choice": [{
                            "option": "A",
                            "answer": "$8.99"
                        }, {
                            "option": "B",
                            "answer": "$16"
                        }, {
                            "option": "C",
                            "answer": "$9.44"
                        }],
                        "answer": "100",
                        "analysis": ["https://www.gaodun.com/share/tiku/image/20161031/20161031151400_92140.png"],
                        "rightAnswer": ["A"],
                        "questionTypes": "单选题"
                    }, {
                        "id": 26,
                        "type": 1,
                        "body": ["5.Assume the above information maintain the same, while the call option change to a put option, calculate the value of a put option with exercise price of $80."],
                        "choice": [{
                            "option": "A",
                            "answer": "0"
                        }, {
                            "option": "B",
                            "answer": "$5.58"
                        }, {
                            "option": "C",
                            "answer": "$5.31"
                        }],
                        "answer": "001",
                        "analysis": ["https://www.gaodun.com/share/tiku/image/20161031/20161031151551_88536.png"],
                        "rightAnswer": ["C"],
                        "questionTypes": "单选题"
                    }],
                    questionTypes: "综合题",
                    type: 5,
                    classify: 1,
                    numberOfErrors: 4,
                    isDo: true,
                    isGoOn: true,
                }
            ],

            errorsValue: [],

            modalData: {
                visible: false,
                title: '',
                value: {
                    analysis: [],
                    // answer:'',
                    body: [],
                    choice: [],
                    type: 1,
                    // 			classify:0,
                    // 			id:1,
                    // numberOfErrors:1,
                    // 			questionTypes:'',
                    rightAnswer: [],
                    // 			isGoOn:false,
                },
            },
        }
    }

    componentWillMount = () => {
        const {errors} = this.state;
        this.setState({errorsValue: errors});
    };

    // Radio
    renderRadio = () => {
        const {radioOption} = this.state;
        return (
            <div className="checkbox-group">
                {
                    (radioOption.value).map((item, index) => (
                        <Button type="ghost" inline size="small"
                                className={item.active ? 'active button' : 'button'} key={item.id}
                                onClick={() => this.onChange(index)}>{item.name}</Button>
                    ))
                }
            </div>
        )
    };

    onChange = (index) => {
        const {errors, radioOption} = this.state;
        let errorsValue = [];
        (radioOption.value).forEach(item => {
            item.active = false;
        });
        (radioOption.value)[index].active = true;

        if (index === 0) {
            errorsValue = errors;
        } else {
            errors.forEach((item) => {
                if (item.classify === index) {
                    errorsValue.push(item);
                }
            });
        }
        this.setState({
            radioOption: radioOption,
            defaultValue: index,
            errorsValue: errorsValue
        });
    };

    // 题干
    renderQuestionBody = (data) => {
        return (
            (data.body).map((item, index) => (
                <p key={index} className="question-body" onClick={() => {
                    this.checkQuestion(data)
                }}>{item}</p>
            ))
        )
    };
    // 打开错题弹窗
    checkQuestion = (data) => {
        // type 1、2、3、7   判断是否做题
        // type 5  全是选择   判断是否做题
        // 其余 不做题
        // isDo: true 可做题  false 不可做题
        // isGoOn: true 可做题  false 不可做题
        console.log("是否可做题", data.isDo);
        console.log("是否继续做题", data.isGoOn);

        let title = '错题回顾';
        if ((data.isDo) && (data.isGoOn)) {
            title = '练习错题';
        }
        let modalData = {
            visible: true,
            title: title,
            value: data
        };
        this.setState({
            modalData: modalData
        },()=>{
            this.props.history.push({
                pathname: `/me/errorModal`,
                state: modalData
            })
        });

    };
    // 关闭错题弹窗
    closeModal = () => {
        let modalData = {
            visible: false,
            title: this.state.modalData.title,
            value: this.state.modalData.value
        };
        this.setState({
            modalData: modalData
        });
    };
    // 移除错题
    confirmRemove = (data) => {
        console.log(data);
        Toast.info('成功移除该题', 1);
    };
    cancelRemove = () => {
        Toast.info('取消移除该题', 1);
    };
    onLeftClick = () => {
        this.props.history.push('/index/me');
    };

    render() {
        const {errorsValue, modalData} = this.state;
        console.log(modalData);
        console.log(errorsValue);
        return (
            <div className="errorsGather">
                <NavBar
                    mode="light"
                    className="navbar"
                    leftContent={<Icon type="cross"></Icon>}
                    onLeftClick={this.onLeftClick}>
                    我的错题集
                </NavBar>
                <div style={{height: '35px'}}></div>

                <div className="errorsGather-content">
                    {this.renderRadio()}

                    <div className="errorsGather-content-wrapper">
                        {
                            errorsValue.map((item, index) => (
                                <div key={index} className="question">
                                    {this.renderQuestionBody(item)}

                                    <p className="question-btn clear">
                                        <span className="text left">本题共错误 {item.numberOfErrors} 次 </span>
                                        <span className="btn right">答疑</span>
                                        <span className="btn right" onClick={() =>
                                            alert('提示', <div><p>是否确定移除该题?</p></div>, [
                                                {
                                                    text: '确认', onPress: () => {
                                                        this.confirmRemove(item)
                                                    }
                                                },
                                                {
                                                    text: '关闭', onPress: () => {
                                                        this.cancelRemove()
                                                    }
                                                },
                                            ])}>移除错题</span>
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/*<ErrorModal modalData={modalData} closeModal={this.closeModal} />*/}
            </div>
        )
    }
}