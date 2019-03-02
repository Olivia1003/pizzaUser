/**
 * created by wjy on 2019/3/1
 * description: 顶部header
 */

import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

interface IProps {
    navigateTo: any;
}

export default class TopHeader extends React.Component<IProps> {

    private navigatePage(pageName) {
        this.props.navigateTo(pageName)
    }

    public render() {

        return (
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.barBtn}
                    onPress={() => { this.navigatePage('Home') }}
                >
                    <Text style={styles.barTxt}>菜单</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.barBtn}
                    onPress={() => { this.navigatePage('Cart') }}
                >
                    <Text style={styles.barTxt}>购物车</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.barBtn}
                    onPress={() => { this.navigatePage('Order') }}
                >
                    <Text style={styles.barTxt}>订单</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.barBtn}
                    onPress={() => { this.navigatePage('MyInfo') }}
                >
                    <Text style={styles.barTxt}>我的</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        backgroundColor: '#ccc',
        // position: 'absolute',
        // bottom: 0
    },
    barBtn: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    barTxt: {
        fontSize: 20,
        color: '#333',
    }
});