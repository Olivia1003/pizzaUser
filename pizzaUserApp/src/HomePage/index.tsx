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
import BottomBar from '../common/component/BottomBar'
import MySearchBar from './components/mySearchBar'
import MenuItem from './components/menuItem'

interface IProps {
    // data: any;
    navigation: any;
}

interface IState {
    searchValue: string
}
export default class MenuPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: ''
        }
        this.navigateToPage = this.navigateToPage.bind(this)
        this.openShopCart = this.openShopCart.bind(this)

    }

    private navigateToPage(pageName) {
        console.log('navigateToPage', pageName)
        this.props.navigation.navigate(pageName)
    }

    private openShopCart() {
        console.log('openShopCart')
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
            <View>
                <Text>name</Text>
                <Text>address</Text>
            </View>
        )
    }

    private renderCartEntry() {
        return (
            <TouchableOpacity
                style={styles.cartEntryWrap}
                onPress={this.openShopCart}
                activeOpacity={0.7}
            >
                <Icon
                    raised
                    reverse
                    size={20}
                    name='home'
                    color='#00aced'
                />
            </TouchableOpacity>
        )
    }

    private renderMenuList() {
        return (
            <View style={styles.menuList}>
                <Icon
                    raised
                    size={20}
                    name='shopping-cart'
                    color='#00aced'
                />
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
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
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
    }
});