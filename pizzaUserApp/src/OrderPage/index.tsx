/**
 * created by wjy on 2019/3/2
 * description: 我的订单界面
 */

import * as React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text, TouchableOpacity
} from 'react-native';
import TopHeader from '../common/component/TopHeader'
import { orderMock } from '../common/mock/orderMock'
import { Button, Icon } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation';

import MapModal from "./components/MapModal";
import { serverIns } from "../common/utils/serverRequest";

const MOCK = false;

interface IProps {
    // data: any;
}
interface IState {
    orderList: any
    isShowMapModal: any
}

export default class OrderPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            isShowMapModal: false,
            orderList: MOCK ? orderMock.orderList : []
        };

        this.showMapModal = this.showMapModal.bind(this)
        this.hideMapModal = this.hideMapModal.bind(this)
    }

    private fetchOrder() {
        serverIns.get(`/order/getOrdersById`).then((res) => {
            let orderList = res.data.model
            this.setState({ orderList })
        })
    }

    private deleteOrder(orderId) {
        console.log('delete ', orderId);
        /*let list = JSON.parse(JSON.stringify(this.state.orderList));
        this.setState({
            orderList:[]
        },()=>{

        })*/
    }
    private checkOrder(order) {
        console.log('check ', order);
        let position = {}
        position.fromX = order.shop.posX
        position.fromY = order.shop.posY
        position.toX = order.toPosX
        position.toY = order.toPosY
        this.setState({ position })
        this.showMapModal()
    }

    render() {
        let { position } = this.state;
        position = position || {}
        return (
            <View style={styles.orderPage}>

                <NavigationEvents
                    onDidFocus={()=>{this.fetchOrder()}}
                />
                <TopHeader title={'我的订单'} />
                <ScrollView>
                    {this.renderOrderList()}
                </ScrollView>
                {this.renderMapModal(position)}

            </View>
        )
    }

    renderOrderList() {
        const { orderList } = this.state;
        return orderList.map(order => {
            const pressCallback = () => {
                this.deleteOrder(order.orderId)
            };
            return (
                <View style={styles.orderCard} key={order.orderId}>
                    <View style={styles.head}>
                        <Text>{order.shop.shopName} > </Text>
                        <TouchableOpacity
                            onPress={pressCallback}
                            activeOpacity={0.7}
                        >
                            <Icon
                                size={18}
                                name='close'
                            />
                        </TouchableOpacity>
                    </View>
                    {this.renderItemList(order.items)}
                    <View style={styles.bottom}>
                        <Text style={styles.itemTotalPriceText}>¥{order.price}</Text>
                        {this.renderButton(order)}
                    </View>
                </View>
            )
        })
    }
    renderItemList(items) {
        return items.map(itemObj => {
            var item = itemObj.item;
            var count = itemObj.count;
            return (
                <View style={styles.itemCard}>
                    <View style={styles.itemName}><Text style={styles.itemNameText}>{item.itemName}</Text></View>
                    <View style={styles.itemCount}><Text style={styles.itemCountText}>✖️{count}</Text></View>
                    <View style={styles.itemPrice}><Text style={styles.itemPriceText}>¥{item.price}</Text></View>
                </View>
            )
        })
    }

    renderButton(order) {
        //判断按钮状态
        if (order.state == 'canceled') {
            return (
                <Button title="已取消"
                    disabled={true}
                    disabledStyle={styles.btnBase}
                    disabledTitleStyle={styles.btnTitleBase}
                    raised={true}></Button>
            )
        } else {
            const pressCallback = () => {
                this.checkOrder(order)
            };
            return (
                <Button onPress={pressCallback}
                    title="查看详情"
                    buttonStyle={[styles.btnBase]}
                    titleStyle={[styles.btnTitleBase]}
                    raised={true}></Button>
            )
        }
    }

    private showMapModal() {
        console.log('showMapModal')
        this.setState({
            isShowMapModal: true
        })
    }

    private hideMapModal() {
        console.log('hideCartModal')
        this.setState({
            isShowMapModal: false
        })
    }

    // 地址modal
    private renderMapModal(position) {
        const { isShowMapModal } = this.state
        return (
            <MapModal position={position} isShow={isShowMapModal} hideModalHandle={this.hideMapModal} />
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
        justifyContent: 'space-between'
    },
    itemName: {
        width: '40%'
    },
    itemCount: {
        width: '30%'
    },
    itemPrice: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
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
        padding: 3
    },
    btnTitleBase: {
        fontSize: 14
    },
    btn: {
        color: '#1C7ED7'
    },
});