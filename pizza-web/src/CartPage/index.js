import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class CartPage extends Component {

    render() {
        return (
            <div>
                <p>cart page</p>
                <Link to='/'>to Home</Link>
            </div>
        )
    }
}
