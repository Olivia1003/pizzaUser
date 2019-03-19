import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// component
import { Button, Layout } from 'antd';


export default class TopHeader extends Component {

    render() {
        return (
            <div>
                <p>order page</p>
                <Link to='/'>to Home</Link>
            </div>
        )
    }
}
