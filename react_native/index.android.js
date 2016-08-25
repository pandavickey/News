/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    AppRegistry,
    Navigator,
    BackAndroid,
} from 'react-native';

import {
    getMainNavigatorRoute
} from './NavigatorUtils';

import SplashScreen from './SplashScreen';

class News extends Component {

    constructor(props) {
        super(props);

        this.state = {
            splashed: false,
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
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    renderScene(route, navigator) {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true;
            }
            return false;
        });
        let Component = route.component;
        return (
            <Component navigator={navigator} route={route}/>
        );
    }

    render() {
        if (!this.state.splashed) {
            return (<SplashScreen />);
        } else {
            return <Navigator
                ref="navigator"
                style={{flex: 1}}
                renderScene={this.renderScene}
                initialRoute={getMainNavigatorRoute()}
            />
        }
    }
}

AppRegistry.registerComponent('News', () => News);
