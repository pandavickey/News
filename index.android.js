/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator,
    BackAndroid,
} from 'react-native';

import {
    getMainNavigator
} from './NavigatorUtils';

import SplashScreen from './SplashScreen';

class News extends Component {

    constructor(props) {
        super(props);

        this.state = {
            splashed: false,
        };
    }

    configureScene() {
        return Navigator.SceneConfigs.PushFromRight;
    }

    componentDidMount() {
        this.timer = setTimeout(
            () => {
                this.setState({splashed: true});
            },
            5000,
        );
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
                initialRoute={getMainNavigator()}
            />
        }
    }
}

AppRegistry.registerComponent('News', () => News);
