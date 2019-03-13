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
import { cartMock } from "../common/mock/cartMock";
import { Button, Icon } from "react-native-elements";

// map
import { WebView } from 'react-native-webview';

const MOCK = true;
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
                <TopHeader title={'购物车'} />
                <Text>map</Text>
                <View style={{
                    width: '100%',
                    height: 500,
                    backgroundColor: '#ccc'
                }}>
                    <WebView
                        source={{ uri: 'https://lbs.amap.com/api/javascript-api/example/riding-route/plan-route-according-to-lnglat' }}
                        style={{ marginTop: 20 }}
                    />
                </View>

            </View>
        )
    }

}