/**
 * created by wjy on 2019/3/1
 * description: 顶部header
 */

import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Header } from 'react-native-elements'


interface IProps {
}

export default class TopHeader extends React.Component<IProps> {
    render() {
        console.log('render RootPage')
        return (
            <View style={styles.headerWrap}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrap: {

    }
});