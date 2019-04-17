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
import { NavigationEvents } from 'react-navigation';

// gloabl
import {getGlobal,setGlobal} from "../common/Global";
import {serverIns} from "../common/utils/serverRequest";
import {showToast} from "../common/utils/Toast";
import {transferUser} from "../common/userTransfer";
import {NavigationEvents} from "react-navigation";

const MOCK = false;


interface IProps {
    // data: any;
    navigation: any;
    user: any;
}
export default class MenuPage extends React.Component<IProps> {
    constructor(props) {

        super(props)
        let user = getGlobal('user');
        let addressOld = user.address || {}

        let address = JSON.parse(JSON.stringify(addressOld));
        this.state = {
            user: MOCK ? userMock.user : user,
            address: address
        }

        this.navigateToPage = this.navigateToPage.bind(this)
    }

    private initPage(): void {
        let user = getGlobal('user');
        serverIns.get(`/user/${user.userId}`).then((res) => {
            let user = transferUser(res.data);
            setGlobal('user',user)
            this.setState({user})
            let addressOld = user.address || {}
            let address = JSON.parse(JSON.stringify(addressOld));
            this.setState({address})
        }, (err) => {
            console.log('err',err)
        })
    }

    private navigateToPage(pageName) {
        this.props.navigation.navigate(pageName)
    }

    private save(){
        const { user, address} = this.state;
        let string = address.addressStr+address.addressStr2;
        console.log('location',string)
        serverIns.get(`https://restapi.amap.com/v3/geocode/geo?address=${string}&city=&key=79ec561a8277c4156d36d6bf67f9248e`).then(res=>{
            let geos = res.data.geocodes
            if (geos && geos.length > 0 ){
                let geo = geos[0].location
                address.posX = geo.split(',')[0]
                address.posY = geo.split(',')[1]
                console.log(address);
                user.address = JSON.stringify(address)
                serverIns.put(`/user/${user.userId}`, user).then((res) => {
                    let user = transferUser(res.data);
                    setGlobal('user',user )
                    this.setState({user})
                    let addressOld = user.address || {}
                    let address = JSON.parse(JSON.stringify(addressOld));
                    this.setState({address})
                    showToast('更新成功')
                }, (err) => {
                    console.log('err',err)
                    showToast('更新失败')
                })
            }
            else{
                showToast('地址无法转换成坐标')
            }
        },res=>{
            showToast('地址无法转换成坐标')
        });

    }


    public renderBtn(addressParam) {
        const { user } = this.state;
        let { address } = user;
        if (JSON.stringify(addressParam) !== JSON.stringify(address)) {
            return (
                <View style={styles.btn}>
                    <Button title='保存'
                            onPress={() => { this.save() }}/>
                </View>
            )
        }
        return null;

    }

    public render() {
        let { address, user } = this.state
        return (
            <View>
                <NavigationEvents
                    onDidFocus={() => { this.initPage() }}
                />
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
                        <View style={styles.textarea}>
                            <Text style={styles.money}>余额: ￥{user.money}</Text>
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
                                placeholder='上海市'
                                label='市'
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
        paddingTop: 40,
        flexDirection: 'row'
    },
    textarea:{
        margin: 5,
        marginLeft: 60,
    },
    userName:{
        fontSize: 20,
        color: '#ffffff'
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
    },
    money:{
        fontSize: 18,
        color: '#ffffff',
        marginRight: 20
    }
});