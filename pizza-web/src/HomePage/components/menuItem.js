import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// components
import { Button } from 'antd'

// css
import './menuItem.css'

export default class MenuItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // searchValue: ''
        }
        this.addCount = this.addCount.bind(this)
        this.deleteCount = this.deleteCount.bind(this)
    }

    addCount() {
        const { addCount, itemData } = this.props;
        if (addCount && typeof addCount === 'function' && itemData.proId !== undefined) {
            addCount(itemData.proId)
        }
    }

    deleteCount() {
        const { deleteCount, itemData } = this.props;
        if (deleteCount && typeof deleteCount === 'function' && itemData.proId !== undefined) {
            deleteCount(itemData.proId)
        }
    }

    renderCountBar() {
        const selectCount = this.props.itemData.selectCount || 0;

        return (
            <div className="countWrap">
                {/* <TouchableOpacity
                    onPress={this.deleteCount}
                    activeOpacity={0.7}
                >
                    <Icon
                        reverse
                        size={8}
                        name='remove'
                        color='#00aced'
                    />
                </TouchableOpacity> */}
                <p>{selectCount}</p>
                {/* <TouchableOpacity
                    onPress={this.addCount}
                    activeOpacity={0.7}
                >
                    <Icon
                        reverse
                        size={8}
                        name='add'
                        color='#00aced'
                    />
                </TouchableOpacity> */}
            </div>
        )
    }

    render() {
        const { itemData, isShowDetail, isShowStock } = this.props
        // const imgUrl = require('../../../images/pizza.png')

        if (itemData && itemData.imgUrl) {
            const { name, detail, stock, price, imgUrl } = itemData;
            const detailView = isShowDetail
                ? (
                    <div className="detail">
                        <p className="detailTxt">{detail}</p>
                    </div>
                ) : undefined;
            const stockView = isShowStock
                ? (
                    <div className="stock">
                        <p className="stockTxt">库存：{stock}</p>
                    </div>
                ) : undefined;
            return (
                <div className="menuItemWrap">
                    <div className="menuItem">
                        <img
                            className="pizzaImg"
                            alt="example"
                            src={require('../../images/pizza.png')}
                        />
                        <div className="bottomPart">
                            <p className="nameTxt">{name}</p>
                            {detailView}
                            <div className="bottomLine">
                                {stockView}
                                <div className="price">
                                    <p className="priceTxt">¥{price}</p>
                                </div>
                                {this.renderCountBar()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div />
            )
        }

    }
}
