import React, { Component } from 'react'
import { AboutProm } from './AboutProm'
import Help from 'components/HelpModel'

class Collaborate extends Component {
    render() {
        const { title, content } = AboutProm['collaborate']
        return (
            <Help title={title} content={content}></Help>
        )
    }
}
export default Collaborate