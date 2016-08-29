/**
 * Created by panda on 16/8/1.
 */
'use strict';

import React, { Component } from 'React';
import {
    Image,
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    ToolbarAndroid,
    BackAndroid,
    TouchableOpacity,
} from 'react-native';

import {
    fetchThemes,
} from '../utils/DataSourceUtils';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import NewsListScreen from './NewsListScreen';

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            themes:null,
        };
    }
    componentDidMount() {
        this.fetchThemeList();
    }

    fetchThemeList() {
        fetchThemes()
            .then((response) => {
                var theme = {
                    id:0,
                    name:'首页',
                };
                response.others.unshift(theme);

                this.setState({
                    themes:response.others.slice(0,8),
                })
            })
            .catch((error) => {
                console.error(error);
            })
            .done();
    }
    render() {
        if (!this.state.themes || this.state.themes.length === 0) {
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
                        tabStyle={{ paddingBottom: 0 }}
                        textStyle={{ fontSize: 16 }}
                    />
                }
                tabBarBackgroundColor="#fcfcfc"
                tabBarUnderlineColor="#3e9ce9"
                tabBarActiveTextColor="#3e9ce9"
                tabBarInactiveTextColor="#aaaaaa">
                {this.state.themes.map((theme) => {
                    const typeView = (
                        <View
                            key={theme.id}
                            tabLabel={theme.name.substring(0,2)}
                            style={{ flex: 1 }}>
                            <NewsListScreen theme={theme} navigator = {this.props.navigator}/>
                        </View>);
                    return typeView;
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

export default HomeScreen;