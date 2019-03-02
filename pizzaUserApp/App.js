
import * as React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomePage from './dest/HomePage/index'
import CartPage from './dest/CartPage/index'

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomePage },
    Cart: { screen: CartPage }
  }, {
    initialRouteName: 'Home',
  })

// const RootStack = createAppContainer(TabNavigator)
console.log('createStackNavigator', createStackNavigator)
console.log('createAppContainer', createAppContainer)

export default createAppContainer(AppNavigator)

// export default class App extends React.Component {
//   render() {
//     // console.log('--Navigator1', Navigator1, Navigator1.StackNavigator)
//     return (
//       <RootStack />
//       // <View style={styles.container}></View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
