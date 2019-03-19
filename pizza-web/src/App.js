import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage/index'
import CartPage from './CartPage/index'
import OrderPage from './OrderPage/index'
import MyPage from './MyPage/index'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/cart' component={CartPage} />
        <Route path='/order' component={OrderPage} />
        <Route path='/my' component={MyPage} />
      </Switch>
    )
  }
}

export default App;
