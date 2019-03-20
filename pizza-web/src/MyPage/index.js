import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// components
import { Button, Layout } from 'antd'
import TopHeader from '../common/component/TopHeader'

const { Header, Footer, Content } = Layout

export default class MyPage extends Component {

    render() {
        return (
            <Layout>
                <Header>
                    <TopHeader />
                </Header>
                <Content>MyPage</Content>
                <Footer>Footer</Footer>
            </Layout>
        )
    }
}
