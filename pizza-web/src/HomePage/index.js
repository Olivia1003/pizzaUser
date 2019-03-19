import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './index.css'

export default class HomePage extends Component {


    // 地址modal
    // renderShopModal() {
    //     console.log('renderShopModal')
    //     const { isShowShopModal } = this.state
    //     return (
    //         <ShopModal isShow={isShowShopModal} hideModalHandle={this.hideShopModal} />
    //     )
    // }

    // 购物车modal
    // renderCartModal() {
    //     console.log('renderCartModal')
    //     const { isShowCartModal } = this.state
    //     return (
    //         <CartModal isShow={isShowCartModal} hideModalHandle={this.hideCartModal} />
    //     )
    // }

    // renderSortBar() {
    //     const priceSortUp = false
    //     const iconName = priceSortUp ? 'trending-up' : 'trending-down'

    //     return (
    //         <div style={styles.sortBar}>
    //             <button
    //                 style={styles.priceSortBtn}
    //                 activeOpacity={0.7}
    //             >
    //                 <p style={styles.sortPriceTxt}>价格</p>
    //             </button>
    //             {this.renderFreshBtn()}
    //         </div>
    //     )
    // }

    renderShopBar() {
        return (
            <button
                className="shopBar"
                onPress={this.showShopModal}
                activeOpacity={1.0}
            >
                <div className="shopName">
                    <p className="shopNameTxt">name</p>
                </div>
                <div className="shopAddr">
                    <p className="shopAddrTxt">address</p>
                </div>
            </button>
        )
    }


    // renderFreshBtn() {
    //     return (
    //         <TouchableOpacity
    //             style={styles.freshBtnWrap}
    //             onPress={() => { this.fetchMenuListData() }}
    //             activeOpacity={0.7}
    //         >
    //             <Icon
    //                 size={20}
    //                 name='refresh'
    //                 color='#fff'
    //             />
    //         </TouchableOpacity>
    //     )
    // }


    // renderCartEntry() {
    //     return (
    //         <TouchableOpacity
    //             style={styles.cartEntryWrap}
    //             onPress={this.showCartModal}
    //             activeOpacity={0.7}
    //         >
    //             <Icon
    //                 raised
    //                 reverse
    //                 size={20}
    //                 name='shopping-cart'
    //                 color='#00aced'
    //             />
    //         </TouchableOpacity>
    //     )
    // }

    // renderMenuList() {
    //     const { menuList } = this.state
    //     // console.log('renderMenuList', menuList)

    //     const menuListView = menuList.map((mItem, index) => {
    //         return (
    //             <MenuItem
    //                 key={`menuItem-${index}`}
    //                 itemData={mItem}
    //                 isShowDetail={true}
    //                 isShowStock={true}
    //                 addCount={this.addMenuItemCount}
    //                 deleteCount={this.deleteMenuItemCount}
    //             />
    //         )
    //     })

    //     return (
    //         <div style={styles.menuList}>
    //             {menuListView}
    //         </div>
    //     )
    // }

    render() {
        console.log('render homePage')

        return (
            <div>
                <p>home</p>
                <p><Link to='/cart'>to cart</Link></p>
                <p><Link to='/order'>to order</Link></p>
                <p><Link to='/my'>to my</Link></p>

                {/* <TopHeader title={'首页'} /> */}
                {/* <MySearchBar /> */}
                {/* {this.renderSortBar()} */}
                {this.renderShopBar()}
                {/* {this.renderMenuList()} */}
                {/* {this.renderCartEntry()} */}
                {/* modal */}
                {/* {this.renderShopModal()} */}
                {/* {this.renderCartModal()} */}
            </div>
        )
    }
}
