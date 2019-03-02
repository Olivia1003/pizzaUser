/**
 * created by wjy on 2019/2/21
 * description: app入口
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
export default class MenuPage extends React.Component<IProps> {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        console.log('render RootPage')
        return (
            <View>
                <TopHeader title={'首页'} />
                <BottomBar />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});