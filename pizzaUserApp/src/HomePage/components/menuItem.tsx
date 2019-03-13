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

    deleteCount: () => void;
    addCount: () => void;
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
        const { addCount } = this.props;
        if (addCount && typeof addCount === 'function') {
            addCount()
        }
    }

    private deleteCount() {
        const { deleteCount } = this.props;
        if (deleteCount && typeof deleteCount === 'function') {
            deleteCount()
        }
    }

    private renderCountBar() {
        const selectCount = this.props.itemData.selectCount || 0;

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
    }

    public render() {
        const { itemData, isShowDetail, isShowStock } = this.props
        // const imgUrl = require('../../../images/pizza.png')

        if (itemData && itemData.imgUrl) {
            const { name, detail, stock, price, imgUrl } = itemData;
            const detailView = isShowDetail
                ? (
                    <Text style={styles.detailTxt}>{detail}</Text>
                ) : undefined;
            const stockView = isShowStock
                ? (
                    <Text style={styles.countTxt}>库存：{stock}</Text>
                ) : undefined;
            return (
                <View style={styles.menuItemWrap}>
                    <Image
                        style={styles.pizzaImg}
                        source={require('../../../images/pizza.png')}
                    />
                    <View style={styles.rightPart}>
                        <Text style={styles.nameTxt}>{name}</Text>
                        {detailView}
                        {stockView}
                        <Text style={styles.priceTxt}>¥{price}</Text>
                        {this.renderCountBar()}
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
        width: 3,
        height: 3
    },
    shadowOpacity: 0.1,
}

const styles = StyleSheet.create({
    menuItemWrap: {
        flexDirection: 'row',
        height: 90,
        marginTop: 10,
        overflow: 'hidden',
        borderRadius: 5,
        backgroundColor: '#ffffff',
        ...shadow
    },
    pizzaImg: {
        width: 90,
        height: 90,
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
    detailTxt: {
        fontSize: 13,
        color: '#aaa'
    },
    countTxt: {
        fontSize: 13,
        color: '#333'
    },
    priceTxt: {
        fontSize: 13,
        color: '#333'
    },
    // count
    countWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        right: 10
    },


});