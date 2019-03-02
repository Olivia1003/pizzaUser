/**
 * created by wjy on 2019/3/2
 * description: 我的订单界面
 */

import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import TopHeader from '../common/component/TopHeader'
import BottomBar from '../common/component/BottomBar'

interface IProps {
    // data: any;
}
export default class OrderPage extends React.Component<IProps> {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        console.log('render OrderPage')
        return (
            <View>
                <TopHeader title={'我的订单'} />
                <BottomBar />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});