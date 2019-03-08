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
    TouchableOpacity
} from 'react-native';
import { Icon, Button } from 'react-native-elements';

import TopHeader from '../common/component/TopHeader'
import MySearchBar from './components/MySearchBar'
import MenuItem from './components/MenuItem'
import ShopModal from './components/ShopModal'
import CartModal from './components/CartModal'
interface IProps {
    // data: any;
    navigation: any;
}

interface IState {
    searchValue: string;
    isShowShopModal: boolean;
    isShowCartModal: boolean;
}
export default class MenuPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            isShowShopModal: false,
            isShowCartModal: false
        }
        this.navigateToPage = this.navigateToPage.bind(this)
        this.showShopModal = this.showShopModal.bind(this)
        this.hideShopModal = this.hideShopModal.bind(this)
        this.showCartModal = this.showCartModal.bind(this)
        this.hideCartModal = this.hideCartModal.bind(this)

    }

    private navigateToPage(pageName) {
        console.log('navigateToPage', pageName)
        this.props.navigation.navigate(pageName)
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
        const iconName = priceSortUp ? 'trending-up' : 'trending-down'

        return (
            <View style={styles.sortBar}>
                <TouchableOpacity
                    style={styles.priceSortBtn}
                    activeOpacity={0.7}
                >
                    <Text style={styles.sortPriceTxt}>价格</Text>
                    <Icon
                        reverse
                        size={15}
                        name={iconName}
                        color='#00aced'
                    />
                </TouchableOpacity>
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
        return (
            <View style={styles.menuList}>
                <MenuItem />
                <MenuItem />
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
    // sortBar
    sortBar: {
        backgroundColor: '#00aced',
        height: 40,
        paddingHorizontal: 10,
    },
    priceSortBtn: {
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