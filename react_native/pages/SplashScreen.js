'use strict';

import React, {Component} from 'React';
import {
    AsyncStorage,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    getMainNavigatorRoute
} from '../utils/NavigatorUtils';

import {API_START_IMAGE_URL} from '../utils/DataSourceUtils';

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
        this.timer = setTimeout(() => {
            this.toMainScreen();
        }, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    toMainScreen() {
        var route = getMainNavigatorRoute();
        this.props.navigator.resetTo(route);
    }

    fetchData() {
        fetch(API_START_IMAGE_URL)
            .then((response) => response.json())
            .then((result) => {
                if (result) {
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

        return (
            <View style={styles.container}>
                <Animated.Image
                    source={img}
                    style={{
                        flex: 1,
                        transform: [
                            {
                                scale: this.state.bounceValue
                            },
                        ]
                    }}/>
                <View style={styles.logoContainer}>
                    <Image source={{uri: 'logo'}} style={{width: 20, height: 20}}/>
                    <Text style={{fontSize: 14, color: '#000000', marginLeft: 10}}>
                        {text}
                    </Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        position: 'absolute',
        bottom: 20,
        left: 50,
        right: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        flexDirection: 'row',
    },

});

export default SplashScreen;
