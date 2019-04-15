/**
 * created by wjy on 2019/3/22
 * description: 新订单
 */

import * as React from 'react'
import {
    Platform,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native'
import TopHeader from '../common/component/TopHeader'
import { cartMock } from "../common/mock/cartMock"
import { Button, Icon, Input } from "react-native-elements"
import { serverIns } from '../common/utils/serverRequest'
import { showToast } from "../common/utils/Toast"
import { transferUser } from "../common/userTransfer"

// gloabl
import { getGlobal, setGlobal } from "../common/Global"

const MOCK = false
interface IProps {
    navigation: any
}

interface IState {
    input: any
    loginMode: number
}
export default class Login extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            input: {
                // 手机号、验证码登录
                phone: '',
                code: '',
                // 用户名、密码登录
                userName: '',
                password: ''
            },
            loginMode: 1, // 1=手机号、验证码登录，2=用户名、密码登录
        }
    }

    private getVarifyCode() {
        const { input } = this.state
        console.log(input)
        if (input.phone) {
            serverIns.post('/user/getMessage', {
                telephone: input.phone
            }).then((res) => {
                showToast('验证码已发送')
            }, (err) => {
                showToast('验证码发送失败')
            })
        } else {
            showToast('手机号不能为空')
        }
    }

    private commitLogin() {
        const { input, loginMode } = this.state
        console.log('commitLogin', input, loginMode)
        if (loginMode === 1) {
            if (input.phone && input.code) {
                serverIns.post('/user/loginBytelephone', {
                    telephone: input.phone,
                    code: input.code
                }).then((res) => {
                    if (res.data.status == '200') {
                        showToast('登录成功，跳转')
                        setGlobal('user', transferUser(res.data.model))
                        this.props.navigation.popToTop()
                    } else {
                        showToast('验证码错误')
                    }
                }, (err) => {
                    showToast('验证码错误')
                })
            } else {
                showToast('输入错误')
            }
        } else {
            if (input.userName && input.password) {
                serverIns.post('/user/login', {
                    nickName: input.userName,
                    password: input.password
                }).then((res) => {
                    if (res.data.status == '200') {
                        showToast('登录成功，跳转')
                        setGlobal('user', transferUser(res.data.model))
                        this.props.navigation.popToTop()
                    } else {
                        showToast('用户名或密码错误')
                    }
                }, (err) => {
                    showToast('用户名或密码错误')
                })
            } else {
                showToast('输入错误')
            }
        }
    }

    private renderPhoneCodeLogin() {
        const { input } = this.state
        return (
            <View style={styles.blockWrap}>
                <View style={styles.inputLine}>
                    <Input
                        containerStyle={styles.infoInput}
                        leftIconContainerStyle={{ marginRight: 10 }}
                        value={input.phone}
                        placeholder='Phone'
                        leftIcon={
                            <Icon name="call" />
                        }
                        onChangeText={(text) => {
                            let { input } = this.state
                            text = text.replace(new RegExp('[^0-9]', "gm"), '')
                            input.phone = text
                            this.setState({ input })
                        }}
                    />
                </View>
                <View style={styles.inputLine}>
                    <Input
                        containerStyle={[styles.infoInput, { width: '60%' }]}
                        leftIconContainerStyle={{ marginRight: 10 }}
                        password={true}
                        value={input.code}
                        placeholder='Verify Code'
                        leftIcon={
                            <Icon name="cloud" />
                        }
                        onChangeText={(text) => {
                            let { input } = this.state
                            input.code = text
                            this.setState({ input })
                        }}
                    />
                    <Button
                        buttonStyle={styles.codeBtn}
                        onPress={() => { this.getVarifyCode() }}
                        title="获取验证码"
                        titleStyle={styles.codeBtnTxt}
                    />
                </View>
            </View>
        )
    }

    private renderNamePwLogin() {
        const { input } = this.state
        return (
            <View style={styles.blockWrap}>
                <View style={styles.inputLine}>
                    <Input
                        containerStyle={styles.infoInput}
                        leftIconContainerStyle={{ marginRight: 10 }}
                        value={input.userName}
                        placeholder='Name'
                        leftIcon={
                            <Icon name="home" />
                        }
                        onChangeText={(text) => {
                            let { input } = this.state
                            input.userName = text
                            this.setState({ input })
                        }}
                    />
                </View>
                <View style={styles.inputLine}>
                    <Input
                        containerStyle={styles.infoInput}
                        leftIconContainerStyle={{ marginRight: 10 }}
                        password={true}
                        value={input.password}
                        placeholder='Password'
                        leftIcon={
                            <Icon name="cloud" />
                        }
                        onChangeText={(text) => {
                            let { input } = this.state
                            input.password = text
                            this.setState({ input })
                        }}
                    />
                </View>
            </View>
        )
    }

    private renderModeTab() {
        const { loginMode } = this.state
        return (
            <View style={styles.modeTabWrap}>
                <Button
                    raised
                    containerStyle={styles.modeTab}
                    titleStyle={styles.modeTabTxt}
                    title="手机验证码"
                    disabled={loginMode === 1}
                    onPress={() => {
                        this.setState({
                            loginMode: 1
                        })
                    }}
                />
                <Button
                    raised
                    containerStyle={styles.modeTab}
                    titleStyle={styles.modeTabTxt}
                    title="用户名、密码"
                    disabled={loginMode === 2}
                    onPress={() => {
                        this.setState({
                            loginMode: 2
                        })
                    }}
                />
            </View>
        )
    }

    private renderLoginTitle() {
        const { loginMode } = this.state
        const title = loginMode === 1 ? '手机验证码登录' : '用户名、密码登录'
        return (
            <View style={styles.loginTitle}>
                <Text style={styles.loginTitleTxt}>{title}</Text>
            </View>
        )
    }

    render() {
        const { loginMode } = this.state
        return (
            <View style={styles.container}>
                {this.renderModeTab()}
                {this.renderLoginTitle()}
                {
                    loginMode === 1
                        ? this.renderPhoneCodeLogin()
                        : this.renderNamePwLogin()
                }
                <Button
                    onPress={() => { this.commitLogin() }}
                    title="登录"
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 60,
    },
    loginTitle: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    loginTitleTxt: {
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold'
    },
    blockWrap: {
        marginTop: 20,
        marginBottom: 30
    },
    inputLine: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoInput: {
        // backgroundColor: '#ccc'
    },
    codeBtn: {
        width: 120
    },
    codeBtnTxt: {
        fontSize: 14
    },
    // modeTab
    modeTabWrap: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modeTab: {
        width: '45%'
    },
    modeTabTxt: {

    }
})