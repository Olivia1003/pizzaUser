/**
 * created by wjy on 2019/2/21
 * description: 我的信息
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
        return (
            <View>
                <TopHeader title={'我的'} />
                {/* <BottomBar navigateTo={this.navigateToPage} /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({

});