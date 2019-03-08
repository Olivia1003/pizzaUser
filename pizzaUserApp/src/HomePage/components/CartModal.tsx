import * as React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native'

import { Overlay } from 'react-native-elements'


import BottomModal from '../../common/component/BottomModal'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const FADE_TIME = 700

interface IProps {
    // title: string;
    isShow: boolean;
    hideModalHandle: any;
}

interface IState {
}

export default class CartModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        console.log('render CartModal')
        const { isShow, hideModalHandle } = this.props
        return (
            <Overlay
                isVisible={isShow}
                onBackdropPress={() => { hideModalHandle() }}
                width={SCREEN_WIDTH - 20}
                height={SCREEN_HEIGHT - 200}
            >
                <View style={styles.cartModal}>

                    <Text>CartModal</Text>

                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    cartModal: {

    }
});