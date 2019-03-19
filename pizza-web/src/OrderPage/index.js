import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class OrderPage extends Component {

    render() {
        return (
            <div>
                <p>order page</p>
                <Link to='/'>to Home</Link>
            </div>
        )
    }
}
