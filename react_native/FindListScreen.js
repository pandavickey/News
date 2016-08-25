'use strict';

import React, {Component} from 'React';
import {
    Image,
    Text,
    ListView,
    StyleSheet,
    View,
    TouchableNativeFeedback,
} from 'react-native';

import {fetchFindList} from './DataSourceUtils';
import {getWebViewNavigatorRoute} from './NavigatorUtils';

class FindListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        }
        this.fetchData = this.fetchData.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetchFindList()
            .then((response) => {
                this.state.dataSource = this.state.dataSource.cloneWithRows(response.newslist);
                this.setState({
                   dataSource:this.state.dataSource,
                });
            })
            .catch((error) => {
                console.error(error);
            })
            .done();
    }

    renderRow(news) {
        return <TouchableNativeFeedback onPress = {() => {
            var route = getWebViewNavigatorRoute();
            route.url = news.url;
            this.props.navigator.push(route);
        } }>
            <View style={styles.column}>
                <Image style={styles.image} source={{uri: news.picUrl}}/>
                <Text style={styles.title}>
                    {news.title}
                </Text>
            </View>
        </TouchableNativeFeedback>
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
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
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
    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 5,
        borderColor: '#dddddd',
        borderStyle: null,
        borderWidth: 0.5,
        borderRadius: 2,
        height:200,
    },
    image:{
        position:"absolute",
        left:0,
        top:0,
        right:0,
        bottom:0,
    },
    title:{
        color:'#4B0082',
    }
});

export default FindListScreen;