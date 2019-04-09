/**
 * created by wjy on 2019/3/22
 * description: 新订单
 */

import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import TopHeader from '../common/component/TopHeader'
import { cartMock } from "../common/mock/cartMock"
import { Button, Icon } from "react-native-elements"

// service
import { userMock } from '../common/mock/userMock'
import { serverIns } from '../common/utils/serverRequest'

// interface
import { MenuItemDataType } from '../common/dataModal/menuItem'

// Global
import { getGlobal } from '../common/Global'

const MOCK = true;
interface IProps {
    // data: any;
    navigation: any;
}

interface IState {
    cartList: MenuItemDataType[]; // 下单item list
    totalPrice: number;
    shopData: any;
    userData: any;
}
export default class NewOrder extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            cartList: [],
            totalPrice: 0,
            shopData: {
                shopId: 0,
                shopName: '',
                shopPos: ''
            },
            userData: {
                nickName: '',
                telephone: '',
                address: {}
            }
        };
    }

    componentDidMount() {
        if (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params) {
            const { params } = this.props.navigation.state
            console.log('NewOrder componentDidMount', params)
            const userData = getGlobal('userData')
            this.setState({
                cartList: params.itemList || [],
                totalPrice: params.totalPrice || 0,
                shopData: params.shopData || {},
                userData
            })
        }
    }

    private navigateToPage(pageName: string, params: any = {}) {
        console.log('navigateToPage---', pageName)
        if (this.props.navigation && typeof this.props.navigation.navigate === 'function') {
            this.props.navigation.navigate(pageName, params)
        }
    }

    private commitPay() {
        console.log('确认支付')
        const { totalPrice, shopData, cartList } = this.state
        const userData = getGlobal('userData')
        if (userData && userData.userId && userData.address && cartList.length > 0) {
            const itemList = cartList.map((cItem: MenuItemDataType) => {
                return {
                    item: {
                        itemId: cItem.proId
                    },
                    count: cItem.selectCount
                }
            })
            const reqParams = {
                userId: userData.userId,
                items: itemList,
                shop: {
                    shopId: shopData.shopId || 2
                },
                toPosX: userData.address.posX || '50.10',
                toPosY: userData.address.posY || '5.1',
                price: totalPrice
            }
            console.log('commitPay reqParams', reqParams)
            serverIns.post('/order/addOrder', reqParams).then(
                (res) => {
                    if (res && res.data && res.data.status && Number(res.data.status) === 200) {
                        console.log('commitPay success', res)
                        this.navigateToPage('PayOver', { isSuccess: true })
                    } else {
                        console.log('commitPay fail', res)
                        this.navigateToPage('PayOver', { isSuccess: false })
                    }

                }, (err) => {
                    console.log('commitPay error', err)
                    this.navigateToPage('PayOver', { isSuccess: false })
                })
        }
    }

    private renderShopAddress() {
        const { shopData } = this.state
        return (
            <View
                style={styles.shopBar}
            >
                <Icon
                    // reverse
                    size={20}
                    name={'home'}
                    color='#00aced'
                />
                <View style={styles.shopName}>
                    <Text style={styles.shopNameTxt}>{shopData.shopName}</Text>
                </View>
                <View style={styles.shopAddr}>
                    <Text style={styles.shopAddrTxt}>{shopData.shopPos}</Text>
                </View>
            </View>
        )
    }

    private renderNewOrderItem(orderItem, index) {
        const { name, selectCount, price } = orderItem

        return (
            <View style={styles.itemCard} key={`new-order-item-${index}`}>
                <View style={styles.itemName}>
                    <Text style={styles.itemNameText}>{name}</Text>
                </View>
                <View style={styles.itemCount}>
                    <Text style={styles.itemCountText}>x{selectCount}</Text>
                </View>
                <View style={styles.itemPrice}>
                    <Text style={styles.itemPriceText}>¥{price}</Text>
                </View>
            </View>
        )
    }

    private renderOrderList() {
        const { cartList } = this.state
        console.log('newOrder renderOrderList', cartList)

        return (
            <View style={styles.orderCard}>
                {
                    cartList.map((oItem, index) => {
                        return this.renderNewOrderItem(oItem, index)
                    })
                }
                {this.renderPriceBar()}
            </View>
        )
    }

    private renderPriceBar() {
        const { totalPrice } = this.state
        return (
            <View style={styles.priceBar}>
                <Text style={styles.priceLabelTxt}>小计</Text>
                <Text style={styles.priceTxt}>￥{totalPrice}</Text>
            </View>
        )
    }

    private renderUserInfo() {
        const { userData } = this.state
        if (!userData || !userData.address) {
            return (<View />)
        }
        const { name, phone, addressStr, addressStr2 } = userData.address

        return (
            <View style={styles.userInfoBar}>
                <View style={styles.userInfoTitle}>
                    <Text style={styles.userInfoTitleTxt}>配送地址</Text>
                </View>
                <View style={styles.userName}>
                    <Text style={styles.userNameTxt}>{name}</Text>
                </View>
                <View style={styles.userPhone}>
                    <Text style={styles.userPhoneTxt}>{phone}</Text>
                </View>
                <View style={styles.userAddress}>
                    <Text style={styles.userAddressTxt}>{addressStr}-{addressStr2}</Text>
                </View>
            </View>
        )

    }

    private renderCommitBar() {
        return (
            <View style={styles.commitBtn}>
                <Button
                    onPress={() => { this.commitPay() }}
                    raised
                    title="确认支付"
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderShopAddress()}
                {this.renderOrderList()}
                {this.renderUserInfo()}
                {this.renderCommitBar()}

            </View>
        )
    }

}

const shadow = {
    shadowOffset: {
        width: 3,
        height: 3
    },
    shadowOpacity: 0.2,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#eee'
    },
    orderCard: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        ...shadow
    },
    itemCard: {
        flexDirection: 'row',
        marginTop: 10
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    bottom: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-end'
    },
    bottomContent: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between'
    },
    itemName: {
        width: '50%'
    },
    itemCount: {
        width: '20%'
    },
    itemPrice: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    itemNameText: {
        fontSize: 18,
        color: '#333'
    },
    itemCountText: {
        fontSize: 20,
        color: '#333'
    },
    itemPriceText: {
        fontSize: 20,
        color: '#FF7F50'
    },
    itemTotalPriceText: {
        fontSize: 20,
        color: '#FF7F50'
    },
    orderPage: {
        backgroundColor: '#F5F5F5',
        flex: 1
    },

    btnBase: {
        height: 25,
        padding: 3,
        paddingHorizontal: 7,
    },
    btnTitleBase: {
        fontSize: 16
    },
    btn: {
        color: '#1C7ED7'
    },
    // shopBar
    shopBar: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 15,
    },
    shopName: {
        marginLeft: 5
    },
    shopNameTxt: {
        color: '#333',
        fontSize: 16
    },
    shopAddr: {
        marginLeft: 5
    },
    shopAddrTxt: {
        color: '#333',
        fontSize: 16
    },
    // priceBar
    priceBar: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    priceLabelTxt: {
        fontSize: 16
    },
    priceTxt: {
        fontSize: 19,
        color: '#FF7F50'
    },
    // userInfoBar
    userInfoBar: {
        flexDirection: 'column',
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        overflow: 'visible',
        ...shadow
    },
    userInfoTitle: {

    },
    userInfoTitleTxt: {
        fontSize: 17,
        color: '#333'
    },
    userName: {
        marginTop: 5
    },
    userNameTxt: {
        fontSize: 17,
        color: '#333'
    },
    userPhone: {
        marginTop: 5
    },
    userPhoneTxt: {
        fontSize: 17,
        color: '#333'
    },
    userAddress: {
        marginTop: 5
    },
    userAddressTxt: {
        fontSize: 17,
        color: '#333'
    },
    // commitBtn
    commitBtn: {
        marginTop: 40,
        marginHorizontal: 10,
    }
})