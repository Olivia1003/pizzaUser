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
import TopHeader from './TopHeader/TopHeader'
import BottomBar from './BottomBar/BottomBar'

interface IProps {
    data: any;
}
export default class RootPage extends React.Component<IProps> {
    render() {
        console.log('render RootPage')
        return (
            <View>
                <TopHeader />
                <BottomBar />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});