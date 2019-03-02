/**
 * created by wjy on 2019/3/1
 * description: 顶部header
 */

import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { ButtonGroup } from 'react-native-elements'

interface IProps {
}

export default class TopHeader extends React.Component<IProps> {

    public render() {
        // const menuBtn = () => <Text>Hello</Text>
        // const cartBtn = () => <Text>World</Text>
        // const orderBtn = () => <Text>ButtonGroup</Text>

        // const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]

        return (
            <View style={styles.barWrap}>
                {/* <ButtonGroup
                    buttons={buttons}
                    containerStyle={{ height: 50 }}
                /> */}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    barWrap: {
        // height: 30
        // position: 'absolute',
        // bottom: 0
    }
});