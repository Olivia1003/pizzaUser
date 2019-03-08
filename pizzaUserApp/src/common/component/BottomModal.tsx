import * as React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    TouchableWithoutFeedback
} from 'react-native'
import { Icon } from 'react-native-elements'

const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback);


interface IProps {
    // title: string;
    isShow: boolean;
    modalContent: any;
}

interface IState {
    contentOpacity: any;
    maskOpacity: any;
}

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const FADE_TIME = 700

export default class BottomModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            contentOpacity: new Animated.Value(0),
            maskOpacity: new Animated.Value(0),
        }
        this.hideModal = this.hideModal.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { isShow } = nextProps;
    }

    componentDidMount() {
        this.showModal()
    }

    private showModal() {
        Animated.parallel([
            Animated.timing(this.state.contentOpacity, {
                toValue: 1,
                duration: FADE_TIME,
            }),
            Animated.timing(this.state.maskOpacity, {
                toValue: 1,
                duration: FADE_TIME,
            }),
        ]).start(() => {
            // setTimeout(() => {
            //     this.setState({ isModalVisible: false });
            // }, 100);
        });
    }

    private hideModal() {
        console.log('hideModal')
        Animated.parallel([
            Animated.timing(this.state.contentOpacity, {
                toValue: 0,
                duration: FADE_TIME,
            }),
            Animated.timing(this.state.maskOpacity, {
                toValue: 0,
                duration: FADE_TIME,
            }),
        ]).start(() => {
            // setTimeout(() => {
            //     this.setState({ isModalVisible: false });
            // }, 100);
        });
    }

    public render() {
        const { contentOpacity } = this.state
        const { modalContent } = this.props

        console.log('render BottomModal', modalContent)


        return (
            <Animated.View
                style={[styles.modalMask, { opacity: contentOpacity }]}
            >
                <Animated.View style={styles.modalContentWrap}>
                    {/* header */}
                    <Animated.View style={styles.modalHeader}>
                        <Animated.View style={styles.closeBtnWrap}>
                            <AnimatedTouchableWithoutFeedback
                                style={styles.closeBtn}
                                onPress={this.hideModal}
                                activeOpacity={0.7}
                            >
                                <Icon
                                    raised
                                    reverse
                                    size={10}
                                    name='close'
                                    color='#00aced'
                                />
                            </AnimatedTouchableWithoutFeedback>
                        </Animated.View>
                    </Animated.View>
                    {/* body */}
                    <Animated.View style={styles.modalBody}>
                        {modalContent}
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    modalMask: {
        zIndex: 100,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContentWrap: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 100,
        top: 100,
        left: 0,
        backgroundColor: '#eee',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    modalHeader: {
        backgroundColor: '#ccc'
    },
    closeBtnWrap: {
        position: 'absolute',
        right: 5,
        top: 5,
        backgroundColor: 'transparent'
    },
    closeBtn: {

    },
    modalBody: {
        padding: 10,

    },


});