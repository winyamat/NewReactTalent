import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import {Customers} from './components/Customer/Customers';
import {Products} from './components/Product/Products';
import {Stores} from './components/Store/Stores';
import Sales from './components/Sale/Sales';
import NavBarSemanticUI from './components/NavBarSemanticUI'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Router>
        <NavBarSemanticUI/>
      
      
        <Route path='/Customer/Customers' component={Customers} />
        <Route path='/Product/Products' component={Products} />
        <Route exact path='/Store/Stores' component={Stores} />
        <Route path='/Sale/Sales' component={Sales} />
        
      
      </Router>

    );
  }
}
