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

interface IProps {
    // data: any;
    // navigation: any;
    itemData: any;
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
        console.log('addCount')
    }

    private deleteCount() {
        console.log('deleteCount')
    }

    private renderCountBar() {
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
                <Text>1</Text>
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
        const { itemData } = this.props
        console.log('render MenuItem', itemData)

        const imgUrl = require('../../../images/pizza.png')


        if (itemData && itemData.item) {
            const pName = itemData.item.itemName || ''
            const pPrice = itemData.item.price || ''
            // const pSize = itemData.item.price || ''
            const pDetail = itemData.item.description || ''
            const pCount = itemData.count || ''
            const pPicUrl = itemData.item.picUrl || ''
            return (
                <View style={styles.menuItemWrap}>
                    <Image
                        style={styles.pizzaImg}
                        source={imgUrl}
                    />
                    <View style={styles.rightPart}>
                        <Text style={styles.nameTxt}>{pName}</Text>
                        <Text style={styles.detailTxt}>{pDetail}</Text>
                        <Text style={styles.countTxt}>库存：{pCount}</Text>
                        <Text style={styles.priceTxt}>¥{pPrice}</Text>
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