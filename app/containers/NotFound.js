import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import 'assets/css/notFound.less'

export default class NotFound extends Component {
    constructor(props, context) {
        super(props);
    }

    componentWillMount() {
        document.body.className = "notMatch"
    }

    componentWillUnmount() {
        document.body.className = ""
    }

    render() {
        const {location, children} = this.props
        return (
            <div>
                <div className="not-find">
                    <div className="wrap">
                        <img src={require("assets/images/notFound.jpg")} alt=""/>
                        <Link to="/"/>
                    </div>
                </div>
            </div>
        )
    }
}