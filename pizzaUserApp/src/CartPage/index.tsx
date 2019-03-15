/**
 * created by wjy on 2019/3/2
 * description: 购物车
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

// map
import { WebView } from 'react-native-webview'

// server
import { transferCartTotalData } from './service/cartTransfer'

// interface
import { cartSetItemType } from '../common/dataModal/cart'
import { MenuItemDataType } from '../common/dataModal/menuItem'

// util
import { calculatePrice } from '../common/utils/priceCal'
const MOCK = true;
interface IProps {
    // data: any;
}

interface IState {
    cartTotalList: cartSetItemType[]
}
export default class CartPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            cartTotalList: []
        };
    }

    public componentDidMount() {
        this.fetchCartData()
    }

    private fetchCartData() {
        let newTotalList = MOCK ? transferCartTotalData(cartMock).cartTotalList : []
        // calculate price
        newTotalList = newTotalList.map((setItem) => {
            const setPrice = calculatePrice(setItem.cartItemList || [])
            return {
                setPrice,
                ...setItem
            }
        })
        this.setState({
            cartTotalList: newTotalList
        })
    }

    // 购物车中一项
    private renderCartItem(cartItemData: MenuItemDataType) {
        const { name, selectCount, price } = cartItemData

        return (
            <View style={styles.itemCard}>
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

    // 一个门店的商品，包括门店信息
    private renderCartSetItem(setItemList: cartSetItemType) {
        if (setItemList && setItemList.cartItemList) {
            const { cartItemList } = setItemList
            const shopName = setItemList.shopName || ''
            const setItemListView = cartItemList.map((itemData, index) => {
                return (
                    <View key={`cartItem-${index}`}>
                        {this.renderCartItem(itemData)}
                    </View>
                )
            })

            return (
                <View style={styles.orderCard}>
                    <View style={styles.head}>
                        <Text>{shopName}</Text>
                        <TouchableOpacity
                            // onPress={pressCallback}
                            activeOpacity={0.7}
                        >
                            <Icon
                                size={18}
                                name='close'
                            />
                        </TouchableOpacity>
                    </View>
                    {/* 商品列表 */}
                    {setItemListView}
                    <View style={styles.bottom}>
                        <View style={styles.bottomContent}>
                            <Text style={styles.itemTotalPriceText}>小计 ¥{setItemList.setPrice}</Text>
                            <Button
                                // onPress={pressCallback}
                                title="结算"
                                buttonStyle={[styles.btnBase]}
                                titleStyle={[styles.btnTitleBase]}
                                raised={true}
                            />
                        </View>
                    </View>
                </View>
            )
        } else {
            return (<View />)
        }
    }

    private renderCartList() {
        const { cartTotalList } = this.state
        console.log('renderCartList total', cartTotalList)
        if (cartTotalList) {
            const cartListView = cartTotalList.map((cartItem, index) => {
                return (
                    <View key={`cartSet-${index}`}>
                        {this.renderCartSetItem(cartItem)}
                    </View>
                )
            })
            return (
                <View>
                    {cartListView}
                </View>
            )
        } else {
            return (<View />)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TopHeader title={'购物车'} />
                {this.renderCartList()}


                {/* <View style={{
                    width: '100%',
                    height: 500,
                    backgroundColor: '#ccc'
                }}>
                    <WebView
                        source={{ uri: 'https://lbs.amap.com/api/javascript-api/example/riding-route/plan-route-according-to-lnglat' }}
                        style={{ marginTop: 20 }}
                    />
                </View> */}

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF1F6'
    },
    orderCard: {
        flexDirection: 'column',
        margin: 10,
        backgroundColor: '#FFFFFF',
        padding: 10,
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 0.1,
        borderRadius: 5
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
        width: '30%'
    },
    itemNameText: {
        fontSize: 20
    },
    itemCountText: {
        fontSize: 20
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
})