import * as React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native'

import { showToast } from '../../common/utils/Toast'

// const MOCK = false

import { Overlay, Button, Icon } from 'react-native-elements'
import { cartMock } from '../../common/mock/cartMock'

// component
import MenuItem from '../components/MenuItem'

// interface 
import { MenuItemDataType } from '../../common/dataModal/menuItem'
// import { cartSetItemType } from '../../common/dataModal/cart'

// server
// import { transferCartData } from '../service/menuTransfer'
// import { serverIns } from '../../common/utils/serverRequest'

// Global
import { getGlobal } from '../../common/Global'

// util
import { calculatePrice } from '../../common/utils/priceCal'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const FADE_TIME = 700

interface IProps {
    // title: string;
    isShow: boolean;
    hideModalHandle: any;
    navigateToNewOrder: any;
    cartSetData: {
        shopId: number,
        shopName: string,
        shopPos: string;
        cartItemList: MenuItemDataType[]
    };
    changeCartCount: any;
}

interface IState {
    // cartSetData: cartSetItemType; // 一个shop的信息，包括购物车list
    // cartSetData: any; // 一个shop的信息，包括购物车list
    totalPrice: number;
    isShowAlert: boolean;
}

export default class CartModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            isShowAlert: false,
            totalPrice: 0
        }

        // this.addCartItemCount = this.addCartItemCount.bind(this)
        // this.deleteCartItemCount = this.deleteCartItemCount.bind(this)
        this.submitCartOrder = this.submitCartOrder.bind(this)
    }

    private currentDeleteItemId = -1 // 记录正在删除id

    componentDidMount() {
        // console.log('CartModal componentDidMount')
        setTimeout(() => {
            // this.showAlert()
        }, 4);
    }

    componentWillReceiveProps(nextProps) {
        console.log('CartModal componentWillReceiveProps', nextProps)
        if (nextProps.cartSetData && nextProps.cartSetData.cartItemList) {
            this.setState({
                totalPrice: calculatePrice(nextProps.cartSetData.cartItemList || [])
            })
        }
    }

    private showAlert() {
        console.log('showAlert')
        this.setState({
            isShowAlert: true
        })
    }

    private hideAlert() {
        console.log('hideAlert')
        this.setState({
            isShowAlert: false
        })
    }

    // 增加/减少购物车count
    private changeCountHandle(proId: number, isAdd: boolean) {
        const { cartSetData } = this.props
        const _this = this
        if (cartSetData && cartSetData.cartItemList) {
            cartSetData.cartItemList.forEach((mItem: MenuItemDataType) => {
                if (mItem.proId === proId) {
                    let newCount = mItem.selectCount
                    if (isAdd) { // add，没有限制
                        newCount++
                        _this.props.changeCartCount(proId, newCount)
                    } else { // minus
                        if (newCount > 1) {
                            newCount--
                            _this.props.changeCartCount(proId, newCount)
                        } else { // delete
                            this.currentDeleteItemId = proId
                            this.showAlert()
                            return
                        }
                    }
                }
            })
        }
    }

    private deleteItemHandle() {
        const deleteId = Number(this.currentDeleteItemId)
        if (deleteId >= 0) {
            console.log('deleteItemHandle currentDeleteItemId', deleteId)
            this.hideAlert()
            // this.props.hideModalHandle()
            this.props.changeCartCount(this.currentDeleteItemId, 0)
        }
    }

    private submitCartOrder() {
        const userId = getGlobal('userId')
        const { navigateToNewOrder, cartSetData } = this.props
        const { totalPrice } = this.state
        const itemList = cartSetData.cartItemList.filter((cItem: MenuItemDataType) => {
            return cItem.selectCount > 0
        })
        if (itemList.length <= 0) {
            showToast('购物车为空，无法下单')
            this.props.hideModalHandle()
            return
        }
        const orderParams = {
            itemList,
            totalPrice,
            shopData: {
                shopId: cartSetData.shopId || 0,
                shopName: cartSetData.shopName || '',
                shopPos: cartSetData.shopPos || ''
            }
        }
        if (navigateToNewOrder && typeof navigateToNewOrder === 'function') {
            navigateToNewOrder(orderParams)
        }
    }

    private renderCartItemList() {
        const { cartSetData } = this.props
        if (cartSetData && cartSetData.cartItemList) {
            const cartListShow = cartSetData.cartItemList
                .filter((pItem: MenuItemDataType) => {
                    return pItem.selectCount > 0
                })
            if (cartListShow.length > 0) {
                return (
                    <View>
                        {
                            cartListShow
                                .map((pItem: MenuItemDataType, index) => {
                                    if (pItem) {
                                        return (
                                            <MenuItem
                                                key={`cartItem-${index}`}
                                                itemData={pItem}
                                                isShowDetail={false}
                                                isShowStock={false}
                                                isShowCount={true}
                                                addCount={() => { this.changeCountHandle(pItem.proId, true) }}
                                                deleteCount={() => { this.changeCountHandle(pItem.proId, false) }}
                                            />
                                        )
                                    }
                                })
                        }
                    </View>
                )
            }
        }

        return (
            <View style={styles.blankWrap}>
                <Text style={styles.blankTxt}>啥也没有~</Text>
            </View>
        )
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

    // Alert modal
    private renderAlert() {
        const { isShowAlert } = this.state
        return (
            <View style={styles.alertWrap}>
                <Overlay
                    isVisible={isShowAlert}
                    onBackdropPress={() => { this.hideAlert() }}
                    width={SCREEN_WIDTH - 80}
                    height={120}
                >
                    <View style={styles.alertTitle}>
                        <Text style={styles.alertTitleTxt}>确认删除吗？</Text>
                    </View>
                    <View style={styles.alertBtnBar}>
                        <Button
                            onPress={() => { this.hideAlert() }}
                            raised
                            title="取 消"
                            type={'outline'}
                        />
                        <Button
                            onPress={() => { this.deleteItemHandle() }}
                            raised
                            title="确 认"
                        />
                    </View>
                </Overlay>
            </View>
        )
    }

    private renderModalHeader() {
        const { hideModalHandle } = this.props
        return (
            <View style={styles.modalHeader}>
                <Text style={styles.headerTitle}>购 物 车</Text>
                <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => { hideModalHandle() }}
                    activeOpacity={0.7}
                >
                    <Icon
                        raised
                        name="close"
                        size={12}
                        color="#00aced"
                    />
                </TouchableOpacity>
            </View>
        )
    }

    private renderContent() {
        const { cartSetData } = this.props
        const { isShow, hideModalHandle } = this.props

        return (
            <View style={styles.cartModalWrap}>
                <Overlay
                    isVisible={isShow}
                    onBackdropPress={() => { hideModalHandle() }}
                    width={SCREEN_WIDTH - 20}
                    height={SCREEN_HEIGHT - 200}
                    overlayBackgroundColor={'#eee'}
                >
                    {this.renderModalHeader()}
                    <ScrollView style={styles.cartModalContent}>
                        {this.renderCartItemList()}
                    </ScrollView>
                    {this.renderTotalPriceBar()}
                    {this.renderAlert()}
                </Overlay>
            </View>
        )
    }

    public render() {
        return (
            <View>
                {this.renderContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 18,
        color: '#333'
    },
    modalHeader: {
        height: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtn: {
        position: 'absolute',
        right: -5,
        top: -7,
        margin: 0
    },
    cartModalWrap: {
        // zIndex: 100
    },
    cartModalContent: {
        flex: 1,
        // marginTop: 5
        // backgroundColor: '#eee'
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
        color: '#FF7F50'
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
    },
    // alert modal
    alertWrap: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    alertTitle: {
        marginTop: 15,
        marginLeft: 10,
    },
    alertTitleTxt: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center'
    },
    alertBtnBar: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    // blank
    blankWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    blankTxt: {
        fontSize: 15,
        color: '#777',
        textAlign: 'center'
    }
});