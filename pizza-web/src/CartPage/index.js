import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// components
import { Button, Layout, Input, Radio } from 'antd'
import TopHeader from '../common/component/TopHeader'

// css
import './index.css'

const { Header, Footer, Content } = Layout

export default class CartPage extends Component {
    // 购物车中一项
    renderCartItem(cartItemData) {
        // const { name, selectCount, price } = cartItemData


        return (
            <div className="basket-box">
                <Radio className="check" defaultChecked={false} />
                <img src="images/glasses-small.jpg" />
                <div className="title"><a href="">555商品标题商品标题商品标题商品标题商品标题商品标题</a></div>
                <div className="detail">商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述</div>
                <div className="single-price"><p>￥</p><p className="price">300</p></div>
                <div className="basket-amount">
                    <Button type="primary" shape="circle" icon="minus" />
                    <Input size="small" />
                    <Button type="primary" shape="circle" icon="plus" />
                </div>
                <div className="total-price"><p>￥</p><p className="price">300</p></div>
                <Button className="single-delete" type="primary" shape="circle" icon="delete" />
            </div>
        )

        // return (
        //     <View style={styles.itemCard}>
        //         <View style={styles.itemName}>
        //             <Text style={styles.itemNameText}>{name}</Text>
        //         </View>
        //         <View style={styles.itemCount}>
        //             <Text style={styles.itemCountText}>x{selectCount}</Text>
        //         </View>
        //         <View style={styles.itemPrice}>
        //             <Text style={styles.itemPriceText}>¥{price}</Text>
        //         </View>
        //     </View>
        // )
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <TopHeader />
                    </Header>
                    <Content>
                        {this.renderCartItem()}
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </div>
        )
    }
}
