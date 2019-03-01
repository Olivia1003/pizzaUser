
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import RootPage from './dest/index'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootPage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
