import React from 'react';
import {Route} from 'react-router-dom';
import antdMobile from 'antd-mobile';
const {
    WingBlank,
    WhiteSpace,
    NavBar,
    Icon,
    Toast,
    Button
} = antdMobile;
import '../../assets/css/base.less';
import '../../assets/css/me.less';

export default class Judge extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            groupID: 27,
            pageHeight: document.documentElement.clientHeight - 45,
            rate: [
                {score: 1, active: false},
                {score: 2, active: false},
                {score: 3, active: false},
                {score: 4, active: false},
                {score: 5, active: false}
            ],
            value:''
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    setScore = (score) => {
        for (let i = 0; i < this.state.rate.length; i++) {
            if (score >= this.state.rate[i].score) {
                this.state.rate[i].active = true;
                this.state.score = score;
            } else {
                this.state.rate[i].active = false;
            }
        }
        this.setState({
            rate: this.state.rate,
            score: score
        });
    };

    handleJudge = () =>{
       let date = this.props.location.state.date;
       let score = this.state.score;
       let feedback = this.state.value;
        gaodun_callback.Group.feedbackBooking(this.state.groupID, date, score, feedback, (resp) => {
            if (resp.status === 0) {
                Toast.success('评价成功', 1, ()=>{
                    this.props.history.push({
                        pathname: `/me/order/list`,
                    })
                });
            } else {
                Toast.fail('取消预约失败', 1);
            }
        })
    };
    onLeftClick = () => {
        this.props.history.push('/me/order/list');
    };

    render() {
        return (
            <div className="order">
                <NavBar
                    mode="dark"
                    className="navbar"
                    leftContent={<Icon type="left"></Icon>}
                    onLeftClick={this.onLeftClick}>
                    评价
                </NavBar>
                <div style={{height: '45px'}}></div>
                <WingBlank>
                    <WhiteSpace size='lg'/>
                    <div className="rate">
                        <span>评分：</span>
                        {this.state.rate.map((item, index) => (
                            item.active ? <img src="../../assets/images/star_active.png" onClick={() => {
                                this.setScore(index+1)
                            }}/> : <img src="../../assets/images/star.png" onClick={() => {
                                this.setScore(index+1)
                            }}/>
                        ))}
                        <textarea
                            rows={5}
                            placeholder="请输入评价"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <Button type='warning' onClick={()=>this.handleJudge()}>评价</Button>
                    </div>
                </WingBlank>
            </div>
        );
    }
}
