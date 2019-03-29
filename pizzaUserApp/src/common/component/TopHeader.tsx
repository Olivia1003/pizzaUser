/**
 * created by wjy on 2019/3/1
 * description: 顶部header
 */

import * as React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Header } from 'react-native-elements'


interface IProps {
    title: string;
}

export default class TopHeader extends React.Component<IProps> {
    render() {
        const { title } = this.props
        return (
            <View style={styles.headerWrap}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: title, style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                    backgroundColor={'#00aced'}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrap: {

    }
});