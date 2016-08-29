/**
 * Created by panda on 16/8/29.
 */
'use strict';

import React, {Component} from 'React';
import {
    AppRegistry,
    Navigator,
    BackAndroid,
} from 'react-native';

import {
    getSplashNavigatorRoute
} from '../utils/NavigatorUtils';

class App extends Component {

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
        return (<Navigator
            ref="navigator"
            style={{flex: 1}}
            renderScene={this.renderScene}
            initialRoute={getSplashNavigatorRoute()}
        />);
    }
}

export default App;