/**
 * created by wjy on 2019/2/21
 * description: app入口
 */

import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import axios from 'axios'
import { showToast } from '../common/utils/Toast'
// component
import { Icon, Button } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import TopHeader from '../common/component/TopHeader'
import MySearchBar from './components/MySearchBar'
import MenuItem from './components/MenuItem'
import ShopModal from './components/ShopModal'
import CartModal from './components/CartModal'

// mock
import { menuMock } from '../common/mock/menuMock'
import { cartMock } from '../common/mock/cartMock'
const MOCK = false

// service
import { transferMenuData, transferCartData } from './service/menuTransfer'
import { serverIns } from '../common/utils/serverRequest'

// interface
import { MenuItemDataType } from '../common/dataModal/menuItem'
interface IProps {
    // data: any;
    navigation: any;
}

interface IState {
    searchValue: string;
    isShowShopModal: boolean;
    isShowCartModal: boolean;
    menuList: MenuItemDataType[];
    selectShop: any;
    priceSortUp: boolean; // 是否价格升序排序
    // cartList: any;
}
export default class MenuPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            isShowShopModal: false,
            isShowCartModal: false,
            menuList: [],
            selectShop: {
                shopId: '2',
                shopName: '披萨店ABC',
                posString: '金沙江路123号'
            },
            priceSortUp: false
            // cartList: MOCK ? transferCartData(cartMock) : [],
        }
        this.navigateToPage = this.navigateToPage.bind(this)
        this.navigateToNewOrder = this.navigateToNewOrder.bind(this)
        this.showShopModal = this.showShopModal.bind(this)
        this.hideShopModal = this.hideShopModal.bind(this)
        this.showCartModal = this.showCartModal.bind(this)
        this.hideCartModal = this.hideCartModal.bind(this)

        this.addMenuItemCount = this.addMenuItemCount.bind(this)
        this.deleteMenuItemCount = this.deleteMenuItemCount.bind(this)
        this.sortMenuByPrice = this.sortMenuByPrice.bind(this)

        // temp
        setTimeout(() => {
            // this.showCartModal()
            // this.navigateToPage('NewOrder')
            // this.navigateToPage('PayOver')
        }, 100);

    }

    public componentDidMount() {
        this.fetchMenuListData()
        this.checkLogin()
    }

    private checkLogin() {
        serverIns.post('/user/login', {
            nickName: "Young",
            password: "123"
        }).then((res) => {
            console.log('checkLogin success', res)
            showToast('登录成功')
        }, (err) => {
            console.log('checkLogin fail', err)
            showToast('登录失败')
        })
    }

    private async fetchMenuListData() {
        if (MOCK) {
            this.setState({
                menuList: transferMenuData(menuMock.menu.items)
            })
        } else {
            serverIns.post('/menu/showMenu', {
                menuId: "",
                shop: {
                    shopId: "2"
                }
            }).then(
                (res) => {
                    console.log('fetchMenuListData success', res, res.data.model.items)
                    if (res && res.data && res.data.model && res.data.model.items) {
                        this.setState({
                            menuList: transferMenuData(res.data.model.items)
                        })
                    }
                }, (err) => {
                    console.log('fetchMenuListData error', err)
                })
        }
    }

    private navigateToPage(pageName: string, params: any = {}) {
        console.log('navigateToPage---', pageName)
        if (this.props.navigation && typeof this.props.navigation.navigate === 'function') {
            this.props.navigation.navigate(pageName, params)
        }
    }

    private navigateToNewOrder(orderParams) {
        console.log('新增订单', orderParams)
        const _this = this
        this.setState({
            isShowCartModal: false
        }, () => {
            _this.navigateToPage('NewOrder', orderParams)
        })
    }

    // 请求服务，改变server购物车
    private serverChangeCart() {
        const { selectShop, menuList } = this.state
        if (selectShop && selectShop.shopId && menuList) {
            const shopId = selectShop.shopId
            const items = menuList.map((mItem) => {
                return {
                    item: {
                        itemId: mItem.proId
                    },
                    count: mItem.selectCount
                }
            })
            console.log('serverChangeCart request', {
                shop: {
                    shopId
                },
                items
            })
            serverIns.post('/menu/showMenu', {
                shop: {
                    shopId
                },
                items
            }).then(
                (res) => {
                    console.log('serverChangeCart success', res)
                    if ((res.data && res.data.status || '') === '200') {
                        showToast('添加成功')
                    } else {
                        showToast('添加失败')
                    }
                }, (err) => {
                    console.log('serverChangeCart error', err)
                })
        }

    }

    private addMenuItemCount(proId: number) {
        console.log('addMenuItemCount', proId)
        const { menuList } = this.state
        let newMenuList = JSON.parse(JSON.stringify(menuList))
        newMenuList.forEach((mItem: MenuItemDataType) => {
            if (mItem.proId === proId) {
                if (mItem.selectCount < mItem.stock) {
                    mItem.selectCount++
                } else {
                    showToast('不能再增加了')
                    return
                }
            }
        })
        this.setState({
            menuList: newMenuList
        }, () => {
            this.serverChangeCart()
        })
    }

    private deleteMenuItemCount(proId: number) {
        console.log('deleteMenuItemCount', proId)
        const { menuList } = this.state
        let newMenuList = JSON.parse(JSON.stringify(menuList))
        newMenuList.forEach((mItem: MenuItemDataType) => {
            if (mItem.proId === proId) {
                if (mItem.selectCount) {
                    mItem.selectCount--
                } else {
                    showToast('不能再减少了')
                    return
                }
            }
        })
        this.setState({
            menuList: newMenuList
        }, () => {
            this.serverChangeCart()
        })
    }

    private sortMenuByPrice() {
        // console.log('sortMenuByPrice', this.state)
        const { priceSortUp, menuList } = this.state
        console.log('sortMenuByPrice', priceSortUp, menuList)
        const newMenuList = JSON.parse(JSON.stringify(menuList))
        newMenuList.sort((a, b) => {
            const diff = priceSortUp
                ? Number(a.price) - Number(b.price)
                : Number(b.price) - Number(a.price)
            return diff
        })
        this.setState({
            priceSortUp: !priceSortUp,
            menuList: newMenuList
        })
    }

    private showShopModal() {
        console.log('showShopModal')
        this.setState({
            isShowShopModal: true
        })
    }

    private hideShopModal() {
        console.log('hideShopModal')
        this.setState({
            isShowShopModal: false
        })
    }

    private showCartModal() {
        console.log('showCartModal')
        this.setState({
            isShowCartModal: true
        })
    }

    private hideCartModal() {
        console.log('hideCartModal')
        this.setState({
            isShowCartModal: false
        })
    }

    private renderSwiper() {
        return (
            <View style={styles.sliderWrap}>
                <Swiper>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
            </View>
        )
    }

    // 地址modal
    private renderShopModal() {
        const { isShowShopModal } = this.state
        return (
            <ShopModal isShow={isShowShopModal} hideModalHandle={this.hideShopModal} />
        )
    }

    // 购物车modal
    private renderCartModal() {
        const { isShowCartModal } = this.state
        return (
            <CartModal
                isShow={isShowCartModal}
                hideModalHandle={this.hideCartModal}
                navigateToNewOrder={this.navigateToNewOrder}
            />
        )
    }

    private renderSortBar() {
        const priceSortUp = false
        const saleSortUp = false
        const priceIconName = priceSortUp ? 'trending-up' : 'trending-down'
        const saleIconName = saleSortUp ? 'trending-up' : 'trending-down'

        return (
            <View style={styles.sortBar}>
                {/* 价格 */}
                <TouchableOpacity
                    style={styles.priceSortBtn}
                    activeOpacity={0.7}
                    onPress={this.sortMenuByPrice}
                >
                    <Text style={styles.sortPriceTxt}>价格</Text>
                    <Icon
                        reverse
                        size={15}
                        name={priceIconName}
                        color='#97CAE5'
                    />
                </TouchableOpacity>
                {/* 销量 */}
                <TouchableOpacity
                    style={styles.priceSortBtn}
                    activeOpacity={0.7}
                >
                    <Text style={styles.sortPriceTxt}>销量</Text>
                    <Icon
                        reverse
                        size={15}
                        name={saleIconName}
                        color='#97CAE5'
                    />
                </TouchableOpacity>
                {/* 刷新 */}
                {this.renderFreshBtn()}
            </View>
        )
    }

    private renderShopBar() {
        const { selectShop } = this.state
        const shopName = selectShop && selectShop.shopName || ''
        const shopAddress = selectShop && selectShop.posString || ''
        return (
            <TouchableOpacity
                style={styles.shopBar}
                onPress={this.showShopModal}
                activeOpacity={0.7}
            >
                <Icon
                    // reverse
                    size={20}
                    name={'home'}
                    color='#00aced'
                />
                <View style={styles.shopName}>
                    <Text style={styles.shopNameTxt}>{shopName}</Text>
                </View>
                <View style={styles.shopAddr}>
                    <Text style={styles.shopAddrTxt}>{shopAddress}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    private renderFreshBtn() {
        return (
            <TouchableOpacity
                style={styles.freshBtnWrap}
                onPress={() => { this.fetchMenuListData() }}
                activeOpacity={0.7}
            >
                <Icon
                    size={20}
                    name='refresh'
                    color='#fff'
                />
            </TouchableOpacity>
        )
    }

    private renderCartEntry() {
        return (
            <TouchableOpacity
                style={styles.cartEntryWrap}
                onPress={this.showCartModal}
                activeOpacity={0.7}
            >
                <Icon
                    raised
                    reverse
                    size={20}
                    name='shopping-cart'
                    color='#00aced'
                />
            </TouchableOpacity>
        )
    }

    private renderMenuList() {
        const { menuList } = this.state

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
            <ScrollView style={styles.menuList}>
                {menuListView}
            </ScrollView>
        )
    }

    public render() {

        return (
            <View style={styles.container}>
                <TopHeader title={'首页'} />
                {this.renderSwiper()}
                {this.renderShopBar()}
                <MySearchBar />
                {this.renderSortBar()}
                {this.renderMenuList()}
                {this.renderCartEntry()}
                {/* modal */}
                {this.renderShopModal()}
                {this.renderCartModal()}
                <TouchableOpacity
                    onPress={() => {
                        this.navigateToPage('NewOrder')
                    }}
                >
                    <Text>to NewOrder</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.navigateToPage('Login')
                    }}
                >
                    <Text>to Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.navigateToPage('Register')
                    }}
                >
                    <Text>to Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        // backgroundColor: 'rgba(0,0,0,0.5)'
    },
    menuList: {
        paddingHorizontal: 10,
    },
    cartEntryWrap: {
        position: 'absolute',
        bottom: 20,
        left: 15
    },
    freshBtnWrap: {
        position: 'absolute',
        top: 5,
        right: 15
    },
    // sortBar
    sortBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
        // backgroundColor: 'rgba(29,173,234,0.3)',
        height: 30,
        paddingHorizontal: 10,
        overflow: 'hidden'
    },
    priceSortBtn: {
        marginRight: 10,
        width: 80,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        // borderRadius: 5,
    },
    sortPriceTxt: {
        fontSize: 15,
        color: '#fff'
    },
    // shopBar
    shopBar: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    shopName: {
        marginLeft: 5
    },
    shopNameTxt: {
        color: '#333',
        fontSize: 14
    },
    shopAddr: {
        marginLeft: 5
    },
    shopAddrTxt: {
        color: '#333',
        fontSize: 14
    },
    // swiper
    sliderWrap: {
        // width:200,
        height: 150
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});