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
import { serverIns } from '../common/utils/serverRequest'
import {showToast} from "../common/utils/Toast";
import {transferUser} from "../common/userTransfer";

// gloabl
import {getGlobal,setGlobal} from "../common/Global";

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

    private getVarifyCode(){
        let { input } = this.state
        console.log(input);
        if (input.phone){
            serverIns.post('/user/getMessage', {
                telephone: input.phone
            }).then((res) => {
                showToast('验证码已发送')
            }, (err) => {
                showToast('验证码发送失败')
            })
        } else{
            showToast('手机号不能为空')
        }
    }
    private login(){
        let { input } = this.state
        console.log(input);
        if (input.phone && input.pw){
            serverIns.post('/user/loginBytelephone', {
                telephone: input.phone
                code: input.pw
            }).then((res) => {
                if (res.data.status == '200'){
                    showToast('登录成功，跳转')
                    setGlobal('user', transferUser(res.data.model))
                    this.props.navigation.popToTop()
                }else{
                    showToast('验证码错误')
                }
            }, (err) => {
                showToast('验证码错误')
            })
        } else{
            showToast('输入错误')
        }
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
                    <Button
                        onPress={() => { this.getVarifyCode() }}
                        title="获取验证码"
                    />

                    <View style={styles.row}>
                        <Input style={styles.input}
                               password={true}
                               value={this.state.input.pw}
                               placeholder='Varify Code'
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
                    <Button
                        onPress={() => { this.login() }}
                        title="登录"
                    />
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