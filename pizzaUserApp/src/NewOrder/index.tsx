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


const MOCK = true;
interface IProps {
    // data: any;
}

interface IState {
    // cartTotalList: cartSetItemType[]
}
export default class NewOrder extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            // cartTotalList: []
        };
    }

    private renderNewOrderItem() {

        const tempData = {
            name: 'name',
            selectCount: '3',
            price: '12'
        }

        const { name, selectCount, price } = tempData


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

    // private render


    render() {
        return (
            <View>
                {this.renderNewOrderItem()}


            </View>
        )
    }

}

const styles = StyleSheet.create({
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