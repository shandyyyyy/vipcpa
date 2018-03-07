import React, { Component } from 'react'
import { AboutProm } from './AboutProm'
import Help from 'components/HelpModel'

class Contact extends Component {
    render() {
        const { title, content } = AboutProm['contact']
        return (
            <Help title={title} content={content}></Help>
        )
    }
}
export default Contact