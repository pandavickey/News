'use strict';

import React, { Component } from 'React';
import {
    View,
    Text,
    WebView,
} from 'react-native';

import {
    fetchNewsDetail,
} from '../utils/DataSourceUtils';

class NewsDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail:null,
        }
        this.fetchDetail = this.fetchDetail.bind(this);
    }

    componentDidMount(){
        this.fetchDetail(this.props.route.story.id);
    }

    fetchDetail(id) {
        fetchNewsDetail(id)
            .then((response) =>{
                this.setState({
                    detail:response,
            });
            })
            .catch((error) => {
                console.error(error);
            })
            .done();
    }

    render() {
        if (this.state.detail) {
            var html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
                + this.state.detail.css[0]
                + '" /></head><body>' + this.state.detail.body
                + '</body></html>';
            return (<WebView html = {html} />);
        } else {
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',}}>
                    <Text>{'正在加载...'}</Text>
                </View> );
        }
    }
}

export default NewsDetailScreen;