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
import TopHeader from '../common/component/TopHeader'
import { cartMock } from "../common/mock/cartMock"
import {Button, Icon, Input} from "react-native-elements"


const MOCK = true;
interface IProps {
    // data: any;
}

interface IState {
    // cartTotalList: cartSetItemType[]
}
export default class Login extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            // cartTotalList: []
            input:{

            }
        };
    }


    render() {
        return (
            <View style={styles.background}>
                <View>
                    <Text>Login</Text>
                </View>
                <View style={styles.contianer}>
                    <View style={styles.row}>
                        <Input style={styles.input}
                               value={this.state.input.phone}
                               placeholder='Phone'
                               leftIcon={
                                   <Icon name="call" />
                               }
                               onChangeText={(text) => {
                                   let { input } = this.state
                                   text = text.replace(new RegExp('[^0-9]',"gm"), '');
                                   input.phone = text
                                   this.setState({input})
                               }}
                        />
                    </View>
                    <View style={styles.row}>
                        <Input style={styles.input}
                               password={true}
                               value={this.state.input.pw}
                               placeholder='Password'
                               leftIcon={
                                   <Icon name="cloud" />
                               }
                               onChangeText={(text) => {
                                   let { input } = this.state
                                   input.pw = text
                                   this.setState({input})
                               }}
                        />
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    background:{
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    },
    row:{
        width: '80%',
        justifyContent: 'center',
        padding: 10
    },
    input:{

    },
    contianer:{
    }
})