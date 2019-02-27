/**
 * created by wjy on 2019/2/21
 */

import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class HeaderTab extends React.Component {
    render() {
        console.log('render HeaderTab')
        return (
            <View>
                <Text style={styles.tabTxt}>HeaderTab content</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabTxt: {
        color: '#f00',
        fontSize: 30
    }
});