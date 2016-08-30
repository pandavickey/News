'use strict';

import React, { Component } from 'React';
import {
  Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import HomeScreen from './HomeScreen';
import FindListScreen from './FindListScreen';
import UserCenterScreen from './UserCenterScreen';

const TITLE_NEWS = 'news';
const TITLE_FIND = 'find';
const TITLE_ME = 'me';

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab:TITLE_NEWS,
    };
  }
  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
            selected={this.state.selectedTab === TITLE_NEWS}
            title = {TITLE_NEWS}
            renderIcon={() => <Image source={require('./../img/icon_news.png')} />}
            renderSelectedIcon={() => <Image source={require('./../img/icon_news_press.png')} />}
            onPress={() => this.setState({ selectedTab: TITLE_NEWS })}>
          <HomeScreen
              navigator={this.props.navigator}
              route={this.props.route}/>
        </TabNavigator.Item>
        <TabNavigator.Item
            selected={this.state.selectedTab === TITLE_FIND}
            title = {TITLE_FIND}
            renderIcon={() => <Image source={require('./../img/icon_find.png')} />}
            renderSelectedIcon={() => <Image source={require('./../img/icon_find_press.png')} />}
            onPress={() => this.setState({ selectedTab: TITLE_FIND })}>
          <FindListScreen
              navigator={this.props.navigator}
              route={this.props.route}/>
        </TabNavigator.Item>
        <TabNavigator.Item
            selected={this.state.selectedTab === TITLE_ME}
            title = {TITLE_ME}
            renderIcon={() => <Image source={require('./../img/icon_me.png')} />}
            renderSelectedIcon={() => <Image source={require('./../img/icon_me_press.png')} />}
            onPress={() => this.setState({ selectedTab: TITLE_ME })}>
          <UserCenterScreen/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

export default MainScreen;