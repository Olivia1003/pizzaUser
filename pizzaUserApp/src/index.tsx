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
import HomePage from './HomePage/index'

interface IProps {
    data: any;
}
export default class RootPage extends React.Component<IProps> {
    render() {
        return (
            <View>
                <HomePage />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});