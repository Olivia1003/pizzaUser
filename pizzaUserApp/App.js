
import * as React from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import HomePage from './dest/HomePage/index'
import CartPage from './dest/CartPage/index'
import OrderPage from './dest/OrderPage/index'
import MyPage from './dest/MyPage/index'


// export default createAppContainer(AppNavigator)

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomePage,
    Cart: CartPage,
    Order: OrderPage,
    MyInfo: MyPage
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let labelName = '菜单'
        let labelColor = focused ? '#1C7ED7' : '#aaaaaa'
        if (routeName === 'Home') {
          labelName = '菜单'
        } else if (routeName === 'Cart') {
          labelName = '购物车'
        } else if (routeName === 'Order') {
          labelName = '订单'
        } else if (routeName === 'MyInfo') {
          labelName = '我的'
        }
        return <Text style={{ color: labelColor }}>{labelName}</Text>
      },
      // tabBarLabel: "菜单",
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let iconName = 'cloud'
        let iconColor = focused ? '#1C7ED7' : '#aaaaaa'
        if (routeName === 'Home') {
          iconName = 'home'
        } else if (routeName === 'Cart') {
          iconName = 'shopping-cart'
        } else if (routeName === 'Order') {
          iconName = 'list'
        } else if (routeName === 'MyInfo') {
          iconName = 'user'
        }

        return <Icon
          name={iconName}
          size={25}
          color={iconColor}
        />
        // return (
        //   <TouchableOpacity>
        //     <Text>{routeName}</Text>
        //   </TouchableOpacity>)
      },
    }),
    // tabBarOptions: {
    //   activeTintColor: '#1C7ED7',
    //   inactiveTintColor: '#aaaaaa',
    // },
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,

  }
)


const RootStack = createAppContainer(TabNavigator)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootStack />
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
