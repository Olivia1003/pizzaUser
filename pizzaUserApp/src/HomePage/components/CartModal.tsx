import * as React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native'

const MOCK = true

import { Overlay } from 'react-native-elements'
import { cartMock } from '../../common/mock/cartMock'

// component
import MenuItem from '../components/MenuItem'

// interface 
import { MenuItemDataType } from '../../common/dataModal/menuItem'

// server
import { transferCartData } from '../service/menuTransfer'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const FADE_TIME = 700

interface IProps {
    // title: string;
    isShow: boolean;
    hideModalHandle: any;
}

interface IState {
    cartSetData: any; // 一个shop的信息，包括购物车list
    totalPrice: number;
}

export default class CartModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            cartSetData: {},
            totalPrice: 0
        }
    }

    componentDidMount() {
        console.log('CartModal componentDidMount')
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps)
        if (nextProps.isShow) {
            // 请求服务
            this.setState({
                cartSetData: MOCK ? transferCartData(cartMock.carts[0]) : [],
                totalPrice: this.calculateTotalPrice([])
            })
        }
    }

    private addCartItemCount() {
        console.log('addCartItemCount')
    }

    private deleteCartItemCount() {
        console.log('deleteCartItemCount')
    }

    private submitCartOrder() {
        console.log('submitCartOrder')
    }

    private calculateTotalPrice(cartList) {
        return 100
    }

    private renderCartItemList() {
        const { cartSetData } = this.state
        console.log('renderCartItemList', cartSetData)
        if (cartSetData && cartSetData.cartList) {
            const cartListView = cartSetData.cartList.map((pItem, index) => {
                if (pItem) {
                    return (
                        <MenuItem
                            key={`cartItem-${index}`}
                            itemData={pItem}
                            isShowDetail={false}
                            isShowStock={false}
                            deleteCount={() => { this.deleteCartItemCount() }}
                            addCount={() => { this.addCartItemCount() }}
                        />
                    )
                }
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

    private renderTotalPriceBar() {
        const { totalPrice } = this.state;
        return (
            <View style={styles.totalPriceBar}>
                <Text style={styles.priceTitleTxt}>总价  </Text>
                <Text style={styles.priceTxt}>¥{totalPrice}</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.submitBtn}
                    onPress={() => { this.submitCartOrder() }}
                >
                    <Text style={styles.submitBtnTxt}>
                        结算
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    public render() {
        const { cartSetData } = this.state
        console.log('render CartModal', cartSetData)
        const { isShow, hideModalHandle } = this.props
        return (
            <Overlay
                isVisible={isShow}
                onBackdropPress={() => { hideModalHandle() }}
                width={SCREEN_WIDTH - 20}
                height={SCREEN_HEIGHT - 200}
            >
                <View style={styles.cartModalWrap}>
                    {this.renderCartItemList()}
                    {this.renderTotalPriceBar()}
                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    cartModalWrap: {
        flex: 1,
        backgroundColor: '#eee'
    },
    // cartItemWrap: {
    //     flexDirection: 'row',
    //     height: 60,
    //     paddingVertical: 10,
    //     paddingHorizontal: 10,
    //     backgroundColor: '#fff',

    // },
    // pName: {
    //     width: '40%'
    // },
    // pNameTxt: {
    //     fontSize: 15,
    //     color: '#333'
    // },
    // pPrice: {
    //     width: '30%'
    // },
    // pPriceTxt: {
    //     fontSize: 15,
    //     color: '#333'
    // },
    // pCount: {
    //     width: '30%'
    // },
    // pCountTxt: {
    //     fontSize: 15,
    //     color: '#333'
    // },

    // totalPriceBar
    totalPriceBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 10
    },
    priceTitleTxt: {
        fontSize: 18,
        color: '#333'
    },
    priceTxt: {
        fontSize: 20,
        color: '#333'
    },
    submitBtn: {
        // position: 'absolute',
        // right: 0,
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00aced',
        borderRadius: 3
    },
    submitBtnTxt: {
        fontSize: 20,
        color: '#fff'
    }
});