import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SearchBar, Icon, Button } from 'react-native-elements';

interface IProps {
    searchValue: string
    onCommitSearch: any
    onUpdateSearch: any
}

interface IState {
}
export default class MySearchBar extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.updateSearch = this.updateSearch.bind(this)
        this.commitSearch = this.commitSearch.bind(this)
    }

    private updateSearch(value) {
        if (typeof this.props.onCommitSearch === 'function') {
            this.props.onUpdateSearch(value)
        }
    }

    private commitSearch() {
        if (typeof this.props.onCommitSearch === 'function') {
            this.props.onCommitSearch()
        }
    }

    public render() {
        const { searchValue } = this.props
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
                        inputStyle={styles.searchInput}
                        platform="default"
                        clearIcon={null}
                        // cancelButtonTitle={'hello'}
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
        // height: 50,
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
        height: 38
    },
    searchBtn: {
        // width: '90%',
    },
    searchInput: {
        // height: 20,
        // backgroundColor: '#aaa',
        // padding: 0
    }
});