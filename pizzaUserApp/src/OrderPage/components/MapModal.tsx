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
        console.log('render ShopModal')
        const { isShow, hideModalHandle } = this.props
        return (
            <Overlay
                isVisible={isShow}
                onBackdropPress={() => { hideModalHandle() }}
                width={SCREEN_WIDTH - 50}
                height={SCREEN_HEIGHT - 200}
            >
                <WebView
                    source={{ uri: 'http://localhost:63342/SeatBack/html/userMap.html?_ijt=bs2ohth1c6lohfh2gjm314bblp' }}
                    style={{ marginTop: 20 }}
                />
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
    shopModal: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        // backgroundColor: '#eee'
    },
    shopItem: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
        ...shadow
    },
    shopItemFirst: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    shopItemSecond: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 18,
    },
    shopNameTxt: {
        fontSize: 15,
        color: '#333'
    },
    shopPosTxt: {
        fontSize: 13,
        color: '#777'
    }
});