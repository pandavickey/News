'use strict';

import React, {Component} from 'React';
import {
    ListView,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import fetchNewsList from '../actions/news';

import {connect} from 'react-redux';

import {
    getNewsDetailNavigatorRoute
} from '../utils/NavigatorUtils';

import NewsItem from './NewsItem';
import ViewPager from 'react-native-viewpager';

var dataState = {
    dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    }),
    headerDataSource: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2,
    })
};


class NewsListScreen extends Component {

    constructor(props) {
        super(props);
        this.fetchList = this.fetchList.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {
        this.fetchList(this.props.theme);
    }

    componentWillReceiveProps(nextProps) {
        // this.fetchList(nextProps.theme);
    }

    onEndReached() {
        this.fetchList(this.props.theme);
    }

    toNewsDetail(story) {
        var route = getNewsDetailNavigatorRoute();
        route.story = story;
        this.props.navigator.push(route);
    }

    renderHeader(headerDataSource) {
        if (this.props.theme.id === 0 && headerDataSource.getPageCount() > 0) {
            return (
                <View style={{flex: 1, height: 200}}>
                    <ViewPager
                        dataSource={headerDataSource}
                        renderPage={this.renderPage}
                        isLoop={true}
                        autoPlay={true}/>
                </View>
            );
        }
        return null;
    }

    renderPage(story) {
        return (
            <TouchableOpacity style={{flex: 1}} onPress={() => this.toNewsDetail(story)}>
                <Image
                    source={{uri: story.image}}
                    style={styles.headerItem}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}
                              numberOfLines={2}>
                            {story.title}
                        </Text>
                    </View>
                </Image>
            </TouchableOpacity>
        )
    }

    renderRow(story) {
        return (
            <NewsItem
                story={story}
                onSelect={() => this.toNewsDetail(story)}/>
        );
    }

    fetchList(theme) {
        var themeId = theme ? theme.id : 0;
        const {news, dispatch} = this.props;
        dispatch(fetchNewsList(themeId, news.lastId[themeId]));
    }

    render() {
        const {news, theme} = this.props;
        const themeId = theme.id;
        var dataSource = news.news[themeId] ? dataState.dataSource.cloneWithRows(news.news[themeId]) : dataState.dataSource;
        var headerDataSource = news.headNews[themeId] ? dataState.headerDataSource.cloneWithPages(news.headNews[themeId]) : dataState.headerDataSource;
        return (!news.news[themeId] || news.news[themeId].length === 0 ) ?
            (<View style={styles.centerEmpty}>
                <Text>{'正在加载...'}</Text>
            </View>) :
            (<ListView
                ref="listview"
                style={styles.listview}
                dataSource={dataSource}
                renderRow={this.renderRow}
                onEndReached={this.onEndReached}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
                renderHeader={() => this.renderHeader(headerDataSource)}
            />);
    }
}
var styles = StyleSheet.create({
    centerEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listview: {
        backgroundColor: '#FAFAFA',
    },
    headerItem: {
        flex: 1,
        height: 200,
        flexDirection: 'row',
    },
    headerTitleContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        marginBottom: 10,
    },
});

function mapStateToProps(state) {
    const {news} = state;
    return {
        news
    };
}

export default connect(mapStateToProps)(NewsListScreen);