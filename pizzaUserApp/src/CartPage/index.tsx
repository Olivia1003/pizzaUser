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
import {cartMock} from "../common/mock/cartMock";
import {Button, Icon} from "react-native-elements";

const MOCK=true;
interface IProps {
    // data: any;
}
export default class CartPage extends React.Component<IProps> {
    constructor(props) {
        super(props)
        this.state = {
            cartList: MOCK ? cartMock.carts : []
        };
    }

    render() {
        console.log('render CartPage')
        return (
            <View>
                <TopHeader title={'购物车'}/>
                {/* <BottomBar /> */}
            </View>
        )
    }
    
}