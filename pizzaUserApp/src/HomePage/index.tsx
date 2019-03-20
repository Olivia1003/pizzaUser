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
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Toast from 'react-native-root-toast'

// component
import TopHeader from '../common/component/TopHeader'
import MySearchBar from './components/MySearchBar'
import MenuItem from './components/MenuItem'
import ShopModal from './components/ShopModal'
import CartModal from './components/CartModal'

// mock
import { menuMock } from '../common/mock/menuMock'
import { cartMock } from '../common/mock/cartMock'
const MOCK = true

// service
import { transferMenuData, transferCartData } from './service/menuTransfer'

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
            priceSortUp: false
            // cartList: MOCK ? transferCartData(cartMock) : [],
        }
        this.navigateToPage = this.navigateToPage.bind(this)
        this.showShopModal = this.showShopModal.bind(this)
        this.hideShopModal = this.hideShopModal.bind(this)
        this.showCartModal = this.showCartModal.bind(this)
        this.hideCartModal = this.hideCartModal.bind(this)

        this.addMenuItemCount = this.addMenuItemCount.bind(this)
        this.deleteMenuItemCount = this.deleteMenuItemCount.bind(this)
        this.sortMenuByPrice = this.sortMenuByPrice.bind(this)

    }

    public componentDidMount() {
        this.fetchMenuListData()
    }

    private fetchMenuListData() {
        console.log('fetchMenuListData')
        this.setState({
            menuList: MOCK ? transferMenuData(menuMock.menu.items) : [],
        })
    }

    private navigateToPage(pageName) {
        console.log('navigateToPage', pageName)
        this.props.navigation.navigate(pageName)
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
                    // Toast.show('不能再增加了')
                }
            }
        })
        this.setState({
            menuList: newMenuList
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
                    // Toast.show('不能再减少了')
                }
            }
        })
        this.setState({
            menuList: newMenuList
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

    // 地址modal
    private renderShopModal() {
        console.log('renderShopModal')
        const { isShowShopModal } = this.state
        return (
            <ShopModal isShow={isShowShopModal} hideModalHandle={this.hideShopModal} />
        )
    }

    // 购物车modal
    private renderCartModal() {
        console.log('renderCartModal')
        const { isShowCartModal } = this.state
        return (
            <CartModal isShow={isShowCartModal} hideModalHandle={this.hideCartModal} />
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
                        color='#00aced'
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
                        color='#00aced'
                    />
                </TouchableOpacity>
                {/* 刷新 */}
                {this.renderFreshBtn()}
            </View>
        )
    }

    private renderShopBar() {
        return (
            <TouchableOpacity
                style={styles.shopBar}
                onPress={this.showShopModal}
                activeOpacity={1.0}
            >
                <Icon
                    // reverse
                    size={20}
                    name={'home'}
                    color='#00aced'
                />
                <View style={styles.shopName}>
                    <Text style={styles.shopNameTxt}>name</Text>
                </View>
                <View style={styles.shopAddr}>
                    <Text style={styles.shopAddrTxt}>address</Text>
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
            <View style={styles.menuList}>
                {menuListView}
            </View>
        )
    }

    public render() {
        console.log('render homePage')

        return (
            <View style={styles.container}>
                <TopHeader title={'首页'} />
                <MySearchBar />
                {this.renderSortBar()}
                {this.renderShopBar()}
                {this.renderMenuList()}
                {this.renderCartEntry()}
                {/* modal */}
                {this.renderShopModal()}
                {this.renderCartModal()}
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
        padding: 10,
    },
    cartEntryWrap: {
        position: 'absolute',
        bottom: 20,
        left: 15
    },
    freshBtnWrap: {
        position: 'absolute',
        top: 10,
        right: 15
    },
    // sortBar
    sortBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00aced',
        height: 40,
        paddingHorizontal: 10,
    },
    priceSortBtn: {
        marginRight: 10,
        width: 80,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00aced',
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
        fontSize: 14
    },
    shopAddr: {
        marginLeft: 5
    },
    shopAddrTxt: {
        fontSize: 14
    }
});