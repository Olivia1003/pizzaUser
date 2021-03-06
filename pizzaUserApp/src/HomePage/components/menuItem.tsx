import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Icon, Button } from 'react-native-elements';

// interface 
import { MenuItemDataType } from '../../common/dataModal/menuItem'

interface IProps {
    // data: any;
    // navigation: any;
    itemData: MenuItemDataType;
    isShowDetail: boolean;
    isShowStock: boolean;
    isShowCount: boolean;
    addCount: () => void;
    deleteCount: () => void;
}

interface IState {
    // searchValue: string
    // itemCount
}
export default class MenuItem extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            // searchValue: ''
        }
        this.addCount = this.addCount.bind(this)
        this.deleteCount = this.deleteCount.bind(this)
    }

    private addCount() {
        const { addCount, itemData } = this.props;
        if (addCount && typeof addCount === 'function' && itemData.proId !== undefined) {
            addCount(itemData.proId)
        }
    }

    private deleteCount() {
        const { deleteCount, itemData } = this.props;
        if (deleteCount && typeof deleteCount === 'function' && itemData.proId !== undefined) {
            deleteCount(itemData.proId)
        }
    }

    private renderCountBar() {
        const { isShowCount } = this.props
        const selectCount = this.props.itemData.selectCount || 0;

        if (isShowCount) {
            return (
                <View style={styles.countWrap}>
                    <TouchableOpacity
                        onPress={this.deleteCount}
                        activeOpacity={0.7}
                    >
                        <Icon
                            reverse
                            size={8}
                            name='remove'
                            color='#00aced'
                        />
                    </TouchableOpacity>
                    <Text>{selectCount}</Text>
                    <TouchableOpacity
                        onPress={this.addCount}
                        activeOpacity={0.7}
                    >
                        <Icon
                            reverse
                            size={8}
                            name='add'
                            color='#00aced'
                        />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.countWrap}>
                    <TouchableOpacity
                        onPress={() => { this.props.addCount() }}
                        activeOpacity={0.7}
                    >
                        <Icon
                            raised
                            reverse
                            name="shopping-cart"
                            size={15}
                            color="#97CAE5"
                        />
                    </TouchableOpacity>
                </View>
            )
        }

    }

    public render() {
        const { itemData, isShowDetail, isShowStock } = this.props
        // const imgList = [
        //     'http://m.xdfxccy.com/images/65.jpg',
        //     'https://i1.wp.com/birthdaywishings.com/wp-content/uploads/2017/09/54212712cef9db878772e34585a202a5.jpg?resize=360%2C180&ssl=1',
        //     'https://y.zdmimg.com/201809/18/5ba091857219e5069.jpg_g360.jpg',
        //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJDs9tyEOI00NRo4cowitrtj04kvz8N3_GXE3RXBGhethDOVs'
        // ]
        // const imgUri = imgList[Number(itemData.proId) % 4]
        const imgList = [
            'http://m.xdfxccy.com/images/65.jpg',
            'https://i1.wp.com/birthdaywishings.com/wp-content/uploads/2017/09/54212712cef9db878772e34585a202a5.jpg?resize=360%2C180&ssl=1',
        ]
        const imgUri = imgList[Number(itemData.proId) % 2]
        if (itemData && itemData.imgUrl) {
            const { name, detail, stock, price, imgUrl } = itemData;
            const detailView = isShowDetail
                ? (
                    <View style={styles.detail}>
                        <Text style={styles.detailTxt}>{detail}</Text>
                    </View>
                ) : undefined;
            const stockView = isShowStock
                ? (
                    <View style={styles.stock}>
                        <Text style={styles.stockTxt}>库存：{stock}</Text>
                    </View>
                ) : undefined;
            return (
                <View style={styles.menuItemWrap}>
                    <View style={styles.menuItem}>
                        <Image
                            style={styles.pizzaImg}
                            // source={require('../../../images/pizza.png')}
                            // source={{ uri: 'http://m.xdfxccy.com/images/65.jpg' }}
                            source={{ uri: imgUri }}
                        />
                        <View style={styles.rightPart}>
                            <Text style={styles.nameTxt}>{name}</Text>
                            {detailView}
                            <View style={styles.bottomLine}>
                                {stockView}
                                <View style={styles.price}>
                                    <Text style={styles.priceTxt}>¥{price}</Text>
                                </View>
                                {this.renderCountBar()}
                            </View>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View />
            )
        }


    }
}

const shadow = {
    shadowOffset: {
        width: 5,
        height: 5
    },
    shadowOpacity: 0.1,
    shadowColor: '#333',
    shadowRadius: 3,
}

const styles = StyleSheet.create({
    menuItemWrap: {
        marginTop: 10,
        ...shadow,
    },
    menuItem: {
        flexDirection: 'row',
        height: 95,
        overflow: 'hidden',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    pizzaImg: {
        width: 90,
        height: 95,
        // borderTopLeftRadius: 5,
        // borderBottomLeftRadius: 5,
        backgroundColor: '#ccc'
    },
    rightPart: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        // backgroundColor: '#aaa'
    },
    nameTxt: {
        fontSize: 17,
        color: '#333'
    },
    detail: {
        marginTop: 5
    },
    detailTxt: {
        fontSize: 13,
        color: '#aaa'
    },
    // bottom
    bottomLine: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 2,
        right: 10
    },
    stock: {
        marginRight: 10
    },
    stockTxt: {
        fontSize: 15,
        color: '#333'
    },
    price: {
        marginRight: 10
    },
    priceTxt: {
        fontSize: 17,
        // fontWeight: 'bold',
        color: '#FF7F50'
    },
    // count
    countWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 5,
        // right: 10
    },


});