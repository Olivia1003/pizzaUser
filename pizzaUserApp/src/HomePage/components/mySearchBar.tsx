import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SearchBar, Icon, Button } from 'react-native-elements';

interface IProps {
    // data: any;
    // navigation: any;
}

interface IState {
    searchValue: string
}
export default class MySearchBar extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: ''
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.commitSearch = this.commitSearch.bind(this)
    }

    private updateSearch(value) {
        // console.log('updateSearch', value)
        this.setState({
            searchValue: value
        })
    }

    private commitSearch() {
        const { searchValue } = this.state
        console.log('commitSearch', searchValue)

    }

    public render() {
        console.log('render MySearchBar')
        const { searchValue } = this.state
        const searchIcon = (
            <Icon
                name='search'
                color='#00aced'
            />
        )
        return (
            <View style={styles.searchBarWrap}>
                <View style={styles.searchWrap}>
                    <SearchBar
                        placeholder="search..."
                        onChangeText={this.updateSearch}
                        value={searchValue}
                        platform="default"
                        clearIcon={null}
                        cancelButtonTitle={'hello'}
                        cancelButtonProps={{
                            disabled: false
                        }}
                        searchIcon={searchIcon}
                        lightTheme={true}
                    />
                </View>
                <View style={styles.btnWrap}>
                    <Button
                        style={styles.searchBtn}
                        title="搜索"
                        type="outline"
                        onPress={this.commitSearch}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBarWrap: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#e1e8ee'
    },
    searchWrap: {
        width: '70%'
    },
    btnWrap: {
        width: '29%',
        paddingLeft: 10,
        paddingRight: 10,
        height: 40
    },
    searchBtn: {
        // width: '90%',
    }
});