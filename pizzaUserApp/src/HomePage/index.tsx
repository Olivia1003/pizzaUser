/**
 * created by wjy on 2019/2/21
 * description: app入口
 */

import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import TopHeader from '../common/component/TopHeader'
import BottomBar from '../common/component/BottomBar'

interface IProps {
    // data: any;
    navigation: any;
}
export default class MenuPage extends React.Component<IProps> {
    constructor(props) {
        super(props)
        this.state = {}
        this.navigateToPage = this.navigateToPage.bind(this)
    }

    private navigateToPage(pageName) {
        console.log('navigateToPage', pageName)
        this.props.navigation.navigate(pageName)
    }

    public render() {
        console.log('render RootPage')
        return (
            <View style={styles.container}>
                <TopHeader title={'首页'} />
                {/* <BottomBar navigateTo={this.navigateToPage} /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    }
});