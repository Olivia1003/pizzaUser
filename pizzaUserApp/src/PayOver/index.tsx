/**
 * created by wjy on 2019/3/22
 * description: 支付完成
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
export default class PayOver extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            // cartTotalList: []
        };
    }


    render() {
        return (
            <View>
                <Text>NewOrder</Text>


            </View>
        )
    }

}

const styles = StyleSheet.create({

})