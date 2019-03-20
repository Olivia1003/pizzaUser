import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// css
import './TopHeader.css'

// component
import { Menu, Icon } from 'antd';

export default class TopHeader extends Component {

    render() {
        return (
            <div className="top-header-wrap">
                <Menu
                    // onClick={this.handleClick}
                    // selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="menu">
                        <Link to='/'>
                            <Icon type="mail" />首页
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="cart">
                        <Link to='/cart'>
                            <Icon type="appstore" />我的购物车
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="order">
                        <Link to='/order'>
                            <Icon type="appstore" />我的订单
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="my">
                        <Link to='/my'>
                            <Icon type="appstore" />我的信息
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
