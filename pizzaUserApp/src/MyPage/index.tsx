/**
 * created by wjy on 2019/2/21
 * description: 我的信息
 */

import * as React from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import TopHeader from '../common/component/TopHeader'
import {Avatar, Button, Input} from 'react-native-elements'
import {userMock} from '../common/mock/userMock'
import add = Animated.add;


const MOCK = true;


interface IProps {
    // data: any;
    navigation: any;
    user: any;
}
export default class MenuPage extends React.Component<IProps> {
    constructor(props) {
        super(props)
        let addressOld = userMock.user.address || {}
        let address = JSON.parse(JSON.stringify(addressOld));
        this.state = {
            user: MOCK ? userMock.user : {},
            address: address
        }
        this.navigateToPage = this.navigateToPage.bind(this)
    }

    private navigateToPage(pageName) {
        this.props.navigation.navigate(pageName)
    }

    public renderBtn(addressParam) {
        const { user } = this.state;
        let { address } = user;
        if (JSON.stringify(addressParam) !== JSON.stringify(address)) {
            return (
                <View style={styles.btn}>
                    <Button title='保存'/>
                </View>
            )
        }
        return null;

    }

    public render() {
        let { address, user } = this.state
        return (
            <View>
                <TopHeader title={'我的'} />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Avatar
                            rounded
                            size="medium"
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                        />
                        <View style={styles.textarea}>
                            <Text style={styles.userName}>{user.nickName}</Text>
                        </View>
                    </View>
                    <View style={styles.address}>
                        <View style={styles.input}>
                            <Input
                                placeholder='姓名'
                                label='联系人'
                                value={address.name}
                                onChangeText={(text) => {
                                    let { address } = this.state
                                    address.name = text
                                    this.setState({address})
                                }}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                placeholder='手机号码'
                                label='电话'
                                value={address.phone}
                                onChangeText={(text) => {
                                    let { address } = this.state
                                    address.phone = text
                                    this.setState({address})
                                }}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                placeholder='地址'
                                label='地址'
                                value={address.addressStr}
                                onChangeText={(text) => {
                                    let { address } = this.state
                                    address.addressStr = text
                                    this.setState({address})
                                }}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                placeholder='例如：5号楼203室'
                                label='门牌号'
                                value={address.addressStr2}
                                onChangeText={(text) => {
                                    let { address } = this.state
                                    address.addressStr2 = text
                                    this.setState({address})
                                }}
                            />
                        </View>
                        {this.renderBtn(address)}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column'
    },
    header:{
        backgroundColor: '#00aced',
        padding: 20,
        flexDirection: 'row'
    },
    textarea:{
        margin: 10,
        marginLeft: 60,
    },
    userName:{
        fontSize: 20
    },
    address:{
        flexDirection: 'column',
        margin: 5,
        backgroundColor: '#FFFFFF',
        padding: 5,
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 0.1,
        borderRadius: 5
    },
    input:{
        margin: 5,
        padding: 5,
    },
    btn:{
        padding: 20
    }

});