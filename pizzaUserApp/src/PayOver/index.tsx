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

// components
import { Icon, Button } from 'react-native-elements'

interface IProps {
    // data: any;
    navigation: any;
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

    private pressBackHandle() {
        console.log('支付成功，返回')
        this.props.navigation.popToTop()
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    reverse
                    name='check'
                    color='#27ae60'
                />
                <View style={styles.payOverTitle}>
                    <Text style={styles.payOverTxt}>支付成功！</Text>
                </View>
                <Button
                    raised
                    onPress={() => { this.pressBackHandle() }}
                    title="返回"
                    buttonStyle={styles.backBtn}
                />

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 150,
        paddingHorizontal: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    payOverTitle: {
        marginTop: 15,
        marginBottom: 30,
        paddingLeft: 15,
    },
    payOverTxt: {
        fontSize: 20,
        color: '#555'
    },
    backBtn: {
        width: 300
    }
})