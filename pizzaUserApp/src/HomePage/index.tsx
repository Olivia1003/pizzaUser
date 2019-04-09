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
import { shopMock } from '../common/mock/shopMock'
const MOCK = false

// service
import { transferMenuData, transferCartData } from './service/menuTransfer'
import { serverIns } from '../common/utils/serverRequest'

// interface
import { MenuItemDataType } from '../common/dataModal/menuItem'
import { cartSetItemType } from '../common/dataModal/cart'
import {setGlobal} from "../common/Global";
import {transferUser} from "../common/userTransfer";
interface IProps {
    // data: any;
    navigation: any;
}

interface IState {
    searchValue: string;
    isShowShopModal: boolean;
    isShowCartModal: boolean;
    priceSortUp: boolean; // 是否价格升序排序
    // data
    menuList: MenuItemDataType[];
    // cartSetData: {
    //     shopId: number,
    //     shopName: string,
    //     cartItemList: MenuItemDataType[],
    // }; // 当前shop的购物车list
    cartItemList: MenuItemDataType[]; // 当前shop的购物车list
    shopList: any[];
    selectShop: any;
}
export default class MenuPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            isShowShopModal: false,
            isShowCartModal: false,
            menuList: [],
            // cartSetData: {
            //     shopId: '',
            //     shopName: '',
            //     cartItemList: [],
            // },
            cartItemList: [],
            shopList: [],
            selectShop: {
                shopId: 2,
                shopName: '',
                posString: ''
            },
            priceSortUp: false
        }
        this.navigateToPage = this.navigateToPage.bind(this)
        this.navigateToNewOrder = this.navigateToNewOrder.bind(this)
        this.showShopModal = this.showShopModal.bind(this)
        this.hideShopModal = this.hideShopModal.bind(this)
        this.showCartModal = this.showCartModal.bind(this)
        this.hideCartModal = this.hideCartModal.bind(this)

        // this.addMenuItemCount = this.addMenuItemCount.bind(this)
        // this.deleteMenuItemCount = this.deleteMenuItemCount.bind(this)
        this.changeCartCount = this.changeCartCount.bind(this)
        this.sortMenuByPrice = this.sortMenuByPrice.bind(this)
        this.selectShopHandle = this.selectShopHandle.bind(this)

        // temp
        setTimeout(() => {
            // this.showCartModal()
            // this.navigateToPage('NewOrder')
            // this.navigateToPage('PayOver')
        }, 100);

    }

    public componentDidMount() {
        this.checkLogin()
        this.fetchShopList()
        // this.fetchMenuListData()
        // this.fetchCartData()
    }

    // 服务：登录
    private checkLogin() {
        serverIns.post('/user/login', {
            nickName: "Young",
            password: "123"
        }).then((res) => {
            console.log('checkLogin success', res)
            setGlobal('user', transferUser(res.data.model))
            console.log('transferUser(res.data)',transferUser(res.data.model));
            showToast('登录成功')
        }, (err) => {
            console.log('checkLogin fail', err)
            showToast('登录失败')
        })
    }

    private fetchShopList() {
        console.log('fetchShopList')
        if (MOCK) {
            this.setState({
                shopList: shopMock.shop
            })
        } else {
            serverIns.post('/shop/findShop', {
                posX: '12.32131',
                posY: '32.32131'
            }).then(
                (res) => {
                    console.log('fetchShopList success', res)
                    if (res && res.data && res.data.model && res.data.model) {
                        const shopList = res.data.model.map((sItem) => {
                            return {
                                shopId: sItem.shopId || 2,
                                shopName: sItem.shopName || '',
                                posString: sItem.posString
                            }
                        })
                        this.setState({
                            shopList,
                            selectShop: shopList[0] || {}
                        }, () => {
                            this.fetchMenuListData()
                            this.fetchCartData()
                        })
                    }
                }, (err) => {
                    console.log('fetchShopList error', err)
                })
        }
    }

    // 服务：获取菜单列表
    private fetchMenuListData() {
        if (MOCK) {
            this.setState({
                menuList: transferMenuData(menuMock.menu.items)
            })
        } else {
            const { selectShop } = this.state
            serverIns.post('/menu/showMenu', {
                menuId: '',
                shop: {
                    shopId: selectShop && selectShop.shopId || '2'
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

    // 服务：获取购物车列表
    private fetchCartData() {
        console.log('fetchCartData start')
        if (MOCK) {
            const cartSetData = transferCartData(cartMock.carts[0])
            this.setState({
                cartItemList: cartSetData.cartItemList
            })
        } else {
            const shopId = this.state.selectShop && this.state.selectShop.shopId || '2'
            serverIns.get(`/cart/showCart?shopId=${shopId}`)
                .then((res) => {
                    console.log('fetchCartData success', res)
                    // showToast('fetchCartData success')
                    if (res && res.data && res.data.model) {
                        this.setState({
                            cartItemList: transferCartData(res.data.model).cartItemList,
                        })
                    }
                }, (err) => {
                    console.log('fetchCartData fail', err)
                    // showToast('fetchCartData fail')
                })
        }
    }

    // 服务：改变server购物车
    private serverChangeCart() {
        const { selectShop, cartItemList } = this.state
        if (selectShop && selectShop.shopId && cartItemList) {
            const shopId = selectShop.shopId
            const items = cartItemList
                .map((mItem) => {
                    return {
                        item: {
                            itemId: mItem.proId
                        },
                        count: mItem.selectCount
                    }
                })
                .filter((mItem) => {
                    return mItem.count > 0
                })
            console.log('serverChangeCart request', JSON.stringify({
                shop: {
                    shopId
                },
                items
            }))
            serverIns.post('/cart/addToCart', {
                shop: {
                    shopId
                },
                items
            }).then(
                (res) => {
                    console.log('serverChangeCart success', res)
                    if ((res.data && res.data.status || '') === '200') {
                        showToast('添加购物车成功')
                    } else {
                        showToast('添加购物车失败')
                    }
                }, (err) => {
                    console.log('serverChangeCart error', err)
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

    /**
     * 改变购物车count
     * @param proId 
     * @param isAdd 增加or减少
     */
    private changeCartCount(proId: number, newCount: number, itemData?: MenuItemDataType) {
        console.log('changeCartCount', proId, newCount)
        const { cartItemList } = this.state
        if (cartItemList) {
            let newCartList: MenuItemDataType[] = JSON.parse(JSON.stringify(cartItemList))
            let foundItem = false
            newCartList.forEach((mItem: MenuItemDataType) => {
                if (Number(mItem.proId) === Number(proId)) {
                    foundItem = true
                    if (newCount > 0) { // add or minus
                        mItem.selectCount = newCount
                    } else { // delete
                        // TODO：删除后是否保留count=0？
                        mItem.selectCount = newCount
                    }
                }
            })
            console.log('---changeCartCount add new 0', foundItem, itemData)
            if (!foundItem && itemData) { // cart新增
                console.log('---changeCartCount add new 1')
                newCartList.push({
                    ...itemData,
                    selectCount: 1
                })
            }
            this.setState({
                cartItemList: newCartList,
            }, () => {
                this.serverChangeCart()
            })
        }
    }

    private selectShopHandle(shopItem) {
        console.log('selectShopHandle', shopItem)
        if (shopItem) {
            const newShop = JSON.parse(JSON.stringify(shopItem))
            this.setState({
                selectShop: newShop
            }, () => {
                this.hideShopModal()
                this.fetchMenuListData()
                this.fetchCartData()
            })
        }
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
                <Swiper
                    autoplay={true}
                    autoplayTimeout={2}
                    autoplayDirection={true}
                >
                    <View style={styles.slide1}>
                        <Text style={styles.text}>{'Pizza Express'}</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>{'30 min'}</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>{'TASTY & FAST'}</Text>
                    </View>
                </Swiper>
            </View>
        )
    }

    // 地址modal
    private renderShopModal() {
        const { isShowShopModal, shopList } = this.state
        return (
            <ShopModal
                isShow={isShowShopModal}
                hideModalHandle={this.hideShopModal}
                shopList={shopList}
                selectShopHandle={this.selectShopHandle}
            />
        )
    }

    // 购物车modal
    private renderCartModal() {
        const { isShowCartModal, cartItemList, selectShop } = this.state
        const cartSetData = {
            shopId: selectShop.shopId,
            shopName: selectShop.shopName,
            shopPos: selectShop.posString,
            cartItemList,
        }
        return (
            <CartModal
                isShow={isShowCartModal}
                hideModalHandle={this.hideCartModal}
                navigateToNewOrder={this.navigateToNewOrder}
                cartSetData={cartSetData}
                changeCartCount={this.changeCartCount}
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
        const freshHandle = () => {
            this.fetchMenuListData()
            this.fetchCartData()
        }
        return (
            <TouchableOpacity
                style={styles.freshBtnWrap}
                onPress={freshHandle}
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
        const { menuList, cartItemList } = this.state
        const _this = this
        const menuListView = menuList.map((mItem: MenuItemDataType, index) => {
            const addCountHandle = () => {
                if (cartItemList) {
                    let foundItem = false
                    cartItemList.forEach((cItem: MenuItemDataType) => {
                        if (Number(cItem.proId) === Number(mItem.proId)) {
                            foundItem = true
                            console.log('index add to cart', cItem.proId)
                            _this.changeCartCount(mItem.proId, cItem.selectCount + 1, mItem)
                        }
                    })
                    if (!foundItem) {
                        _this.changeCartCount(mItem.proId, 1, mItem)
                    }
                }
            }
            return (
                <MenuItem
                    key={`menuItem-${index}`}
                    itemData={mItem}
                    isShowDetail={true}
                    isShowStock={true}
                    isShowCount={false}
                    addCount={addCountHandle}
                    deleteCount={() => { }}
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
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
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
        bottom: 15,
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
        alignItems: 'center',
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