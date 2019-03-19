import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class MyPage extends Component {

    render() {
        return (
            <div>
                <p>my page</p>
                <Link to='/'>to Home</Link>
            </div>
        )
    }
}
