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

import {
    fetchNews,
} from '../utils/DataSourceUtils';

import {
    getNewsDetailNavigatorRoute
} from '../utils/NavigatorUtils';

import NewsItem from './NewsItem';
import ViewPager from 'react-native-viewpager';


class NewsListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastID: null,
            newsList: null,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
            headerDataSource: new ViewPager.DataSource({
                pageHasChanged: (p1, p2) => p1 !== p2,
            })
        }
        this.fetchNewsList = this.fetchNewsList.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {
        this.fetchNewsList(this.props.theme);
    }

    componentWillReceiveProps(nextProps) {
        this.fetchNewsList(nextProps.theme);
    }

    onEndReached() {
        this.fetchNewsList(this.props.theme);
    }

    toNewsDetail(story) {
        var route = getNewsDetailNavigatorRoute();
        route.story = story;
        this.props.navigator.push(route);
    }
    renderHeader() {
        if (this.props.theme.id === 0 && this.state.headerDataSource.getPageCount() > 0) {
            return (
                <View style={{flex: 1, height: 200}}>
                    <ViewPager
                        dataSource={this.state.headerDataSource}
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
            <TouchableOpacity style={{flex: 1}} onPress = {() => this.toNewsDetail(story)}>
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
                onSelect = {() => this.toNewsDetail(story)}/>
        );
    }

    fetchNewsList(theme) {
        var themeId = theme ? theme.id : 0;

        fetchNews(themeId, this.state.lastID)
            .then((response) => {
                var newLastID;
                var newNewsList = this.state.newsList;
                var newheaderDataSource = this.state.headerDataSource;
                if (themeId == 0) {
                    newLastID = response.date;
                } else {
                    var length = response.stories.length;
                    if (length > 0) {
                        newLastID = response.stories[length - 1].id;
                    }
                }

                if (this.state.lastID) {
                    newNewsList = newNewsList.concat(response.stories);
                } else {
                    newNewsList = response.stories;
                    if (response.top_stories && response.top_stories.length > 0) {
                        newheaderDataSource = newheaderDataSource.cloneWithPages(response.top_stories.slice());
                    }
                }
                this.setState({
                    lastID: newLastID,
                    newsList: newNewsList,
                    dataSource: this.state.dataSource.cloneWithRows(newNewsList),
                    headerDataSource: newheaderDataSource,
                });

            })
            .catch((error) => {
                console.error(error);
            })
            .done();
    }

    render() {
        var content = this.state.dataSource.getRowCount() === 0 ?
            <View style={styles.centerEmpty}>
                <Text>{'正在加载...'}</Text>
            </View> :
            <ListView
                ref="listview"
                style={styles.listview}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                onEndReached={this.onEndReached}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
                renderHeader={this.renderHeader}
            />;
        return content;
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

export default NewsListScreen;