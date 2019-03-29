/**
 * created by wjy on 2019/3/22
 * description: 新订单
 */

import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import { Input, Icon } from "react-native-elements"


const MOCK = true;
interface IProps {
    // data: any;
}

interface IState {
    // cartTotalList: cartSetItemType[]
}
export default class Register extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            // cartTotalList: []
        };
    }


    render() {
        return (
            <View>
                <View>
                    <Text>Register</Text>
                </View>
                <View style={styles.contianer}>
                    <View style={styles.row}>
                        <Input style={styles.input}
                            placeholder='User Name'
                            leftIcon={
                                <Icon name="person" />
                            }
                        />
                    </View>
                    <View style={styles.row}>
                        <Input style={styles.input}
                            placeholder='Phone'
                            leftIcon={
                                <Icon name="call" />
                            }
                        />
                    </View>
                    <View style={styles.row}>
                        <Input style={styles.input}
                            placeholder='Varify Code'
                            leftIcon={
                                <Icon name="cloud" />
                            }
                        />
                    </View>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    row:{
        width: '80%',
        justifyContent: 'center'
    },
    input:{

    },
    contianer:{

    }
})