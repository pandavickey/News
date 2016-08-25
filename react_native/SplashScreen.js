
'use strict';

import React, { Component } from 'React';
import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  getWindowWidth,
} from './CommonUtils';

import {
	getStartImage,
} from './DataSourceUtils';

import Animated from 'Animated';

class SplashScreen extends Component {

  constructor(props) {
	super(props);
	this.state = {
  	cover: null,
  	bounceValue: new Animated.Value(1),
	}
  }

  componentDidMount() {
  	this.fetchData();
  }
  fetchData() {
		getStartImage()
	  	.then((result) => {
        if (result){
          this.setState({
            cover: result
          });
          Animated.timing(
            this.state.bounceValue,
            {
              toValue: 1.2,
              duration: 3000,
            }
          ).start();
        }
      })
  .catch((error) => {
        console.error(error);
      })
	  .done();
  }

  render() {
    var img, text;
    if (this.state.cover) {
      img = {uri: this.state.cover.img};
      text = this.state.cover.text;
    }

    return(
      <View style={styles.container}>
        <Animated.Image
          source={img}
          style={{
            flex: 1,
            width: getWindowWidth(),
            height: 1,
            transform: [
              {
                scale: this.state.bounceValue
              },
            ]
          }}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default SplashScreen;
