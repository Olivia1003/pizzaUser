import * as React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native'

// components
import { Overlay } from 'react-native-elements'
import { Icon, Button } from 'react-native-elements';
import { WebView } from 'react-native-webview'
// server
// import { shopMock } from '../../common/mock/shopMock'
// import { transferShopData } from '../service/shopTransfer'

const MOCK = true
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

interface IProps {
    // title: string;
    isShow: boolean
    hideModalHandle: any
    position: any
    addressFrom: any
    addressTo: any
}

interface IState {
    // shopList: any
}

export default class MapModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            // shopList: []
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps)
        if (nextProps.isShow) {
            // 请求服务
            // this.setState({
            //     shopList: MOCK ? transferShopData(shopMock) : [],
            // })
        }
    }

    private selectShopHandle(shopId: number) {
        console.log('selectShopHandle', shopId)
    }

    public render() {
        const { isShow, hideModalHandle ,position, addressFrom, addressTo} = this.props
        const { fromX, fromY, toX, toY} = position
        console.log(addressFrom)
        console.log(addressTo)
        return (
            <Overlay
                isVisible={isShow}
                onBackdropPress={() => { hideModalHandle() }}
                width={SCREEN_WIDTH - 50}
                height={SCREEN_HEIGHT - 200}
            >
                <WebView
                    source={{ uri: `http://localhost:8021/?fromX=${fromX}&fromY=${fromY}&toX=${toX}&toY=${toY}` }}
                    style={{ marginTop: 20 }}
                />
                <View style={styles.address}>
                    <View style={styles.left}>
                        <Text style={styles.addressTxt}>{addressFrom}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.addressTxt}>{addressTo}</Text>
                    </View>
                </View>

            </Overlay>
        )
    }
}

const shadow = {
    shadowOffset: {
        width: 5,
        height: 3
    },
    shadowOpacity: 0.1,
    shadowColor: '#333',
    shadowRadius: 3,
}

const styles = StyleSheet.create({
    address: {
        height: SCREEN_WIDTH/3.5
        ,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    left: {
        width: '40%'
    },
    right: {
        width: '40%'
    },
    addressTxt: {

    },

});