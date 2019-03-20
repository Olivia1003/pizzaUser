import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// components
import { Button, Layout } from 'antd'
import TopHeader from '../common/component/TopHeader'
import MenuItem from './components/menuItem'

// css
import './index.css'

// service
import { transferMenuData, transferCartData } from './service/menuTransfer'

// mock
import { menuMock } from '../common/mock/menuMock'

const MOCK = true
const { Header, Footer, Content } = Layout

export default class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            isShowShopModal: false,
            isShowCartModal: false,
            menuList: [],
            priceSortUp: false
            // cartList: MOCK ? transferCartData(cartMock) : [],
        }
        // this.showShopModal = this.showShopModal.bind(this)
        // this.hideShopModal = this.hideShopModal.bind(this)
        // this.showCartModal = this.showCartModal.bind(this)
        // this.hideCartModal = this.hideCartModal.bind(this)

        // this.addMenuItemCount = this.addMenuItemCount.bind(this)
        // this.deleteMenuItemCount = this.deleteMenuItemCount.bind(this)
        // this.sortMenuByPrice = this.sortMenuByPrice.bind(this)

    }

    componentDidMount() {
        this.fetchMenuListData()
    }

    fetchMenuListData() {
        console.log('fetchMenuListData')
        this.setState({
            menuList: MOCK ? transferMenuData(menuMock.menu.items) : [],
        })
    }


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

    // renderShopBar() {
    //     return (
    //         <button
    //             className="shopBar"
    //             onPress={this.showShopModal}
    //             activeOpacity={1.0}
    //         >
    //             <div className="shopName">
    //                 <p className="shopNameTxt">name</p>
    //             </div>
    //             <div className="shopAddr">
    //                 <p className="shopAddrTxt">address</p>
    //             </div>
    //         </button>
    //     )
    // }


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

    renderMenuList() {
        const { menuList } = this.state
        // console.log('renderMenuList', menuList)
        const menuListView = menuList.map((mItem, index) => {
            return (
                <MenuItem
                    key={`menuItem-${index}`}
                    itemData={mItem}
                    isShowDetail={true}
                    isShowStock={true}
                    addCount={this.addMenuItemCount}
                    deleteCount={this.deleteMenuItemCount}
                />
            )
        })
        return (
            <div className="menuList">
                {menuListView}
            </div>
        )
    }

    render() {
        console.log('render homePage')

        return (
            // <div>
            //     {/* <MySearchBar /> */}
            //     {/* {this.renderSortBar()} */}
            //     {this.renderShopBar()}
            //     {/* {this.renderCartEntry()} */}
            //     {/* modal */}
            //     {/* {this.renderShopModal()} */}
            //     {/* {this.renderCartModal()} */}
            // </div>
            <Layout>
                <Header>
                    <TopHeader />
                </Header>
                <Content>
                    {this.renderMenuList()}
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        )
    }
}
