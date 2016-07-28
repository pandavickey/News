/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';


class News extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      splashed:false,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(
      () => {
        this.setState({splashed: true});
      },
      5000,
    );
  }
  render() {
    if (!this.state.splashed) {
        return (<SplashScreen />);
      } else {
      return (<MainScreen/>);
    }
  }
}


AppRegistry.registerComponent('News', () => News);
