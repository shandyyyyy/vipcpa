import React, { Component } from 'react';

export default class About extends Component {
    constructor(props, context){
        super(props);
        this.state = {
            data: {}
        }
    }
    componentWillMount() {
    }
    go404(){
        this.props.history.push({
            pathname: '/404'
        })
    }
    goLogin(){
        this.props.history.push({
            pathname: '/login'
        })
    }
    render() {
        return (
            <div>
                <button onClick={()=>{this.go404()}}>DIAN JI</button>
                <button onClick={()=>{this.goLogin()}}>login</button>
                <button onClick={()=>{this.props.history.push({pathname: '/product'})}}>商品页</button>
            </div>
        )
    }
}