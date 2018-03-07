import React, { Component } from 'react'
import { AboutProm } from './AboutProm'
import Help from 'components/HelpModel'

class About extends Component {
    render() {
        const { title, content } = AboutProm['about']
        return (
            <Help title={title} content={content}></Help>
        )
    }
}
export default About