import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// components
import { Button, Layout } from 'antd'
import TopHeader from '../common/component/TopHeader'

const { Header, Footer, Content } = Layout

export default class CartPage extends Component {

    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <TopHeader />
                    </Header>
                    <Content>CartPage</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </div>
        )
    }
}
