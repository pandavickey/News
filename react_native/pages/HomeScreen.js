/**
 * Created by panda on 16/8/1.
 */
'use strict';

import React, {Component} from 'React';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {fetchThemes} from '../actions/theme'

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import NewsListScreen from './NewsListScreen';

class HomeScreen extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchThemes());
    }

    render() {
        const {theme} = this.props;
        if (theme.loading) {
            return (
                <View style={styles.centerEmpty}>
                    <Text>{'正在加载...'}</Text>
                </View> );
        }
        return (
            <ScrollableTabView
                renderTabBar={() =>
                    <DefaultTabBar
                        underlineHeight={2}
                        tabStyle={{paddingBottom: 0}}
                        textStyle={{fontSize: 16}}
                    />
                }
                tabBarBackgroundColor="#fcfcfc"
                tabBarUnderlineColor="#3e9ce9"
                tabBarActiveTextColor="#3e9ce9"
                tabBarInactiveTextColor="#aaaaaa">
                {theme.themeList.map((theme) => {
                    return (
                        <View
                            key={theme.id}
                            tabLabel={theme.name.substring(0, 2)}
                            style={{flex: 1}}>
                            <NewsListScreen theme={theme} navigator={this.props.navigator}/>
                        </View>);
                })}
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    centerEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function mapStateToProps(state) {
    const {theme} = state;
    return {
        theme
    };
}

export default connect(mapStateToProps)(HomeScreen);