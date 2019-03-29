
import * as React from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

// tab page
import HomePage from './dest/HomePage/index'
import CartPage from './dest/CartPage/index'
import OrderPage from './dest/OrderPage/index'
import MyPage from './dest/MyPage/index'

// other page
import NewOrder from './dest/NewOrder/index'
import PayOver from './dest/PayOver/index'
import Login from './dest/Login/index'
import Register from './dest/Register/index'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const MainPage = createBottomTabNavigator(
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

const stackNavigator = createStackNavigator({
  Home: {
    screen: MainPage,
    navigationOptions: () => ({
      header: null,
      headerBackTitle: null,
    }),
  },
  NewOrder: {
    screen: NewOrder,
    navigationOptions: () => ({
      title: '下单',
      // headerBackTitle: null,
    }),
  },
  PayOver: {
    screen: PayOver,
    navigationOptions: () => ({
      header: null
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      title: '登录'
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: () => ({
      title: '注册'
    }),
  }
})

const RootPage = createAppContainer(stackNavigator)

export default class App extends React.Component {
  render() {
    return (
      // <RootPage />

      <View style={styles.container}>
        <RootPage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    // backgroundColor: '#F5FCFF',
    backgroundColor: '#ccc'
  },
  // fullPage: {
  //   width: 100,
  //   height: 100,
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  //   backgroundColor: '#ccc'
  // }
});
