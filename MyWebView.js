/**
 * Created by panda on 16/8/2.
 */
import React, { Component } from 'React';
import {
    View,
    Text,
    WebView,
} from 'react-native';

class MyWebView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:true,
        }
    }

    componentDidMount() {
        this.timer = setTimeout(
            () => {
                this.setState({loading: false});
            },
            1000,
        );
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text>{'正在加载...'}</Text>
                </View> );
        }
        return (<WebView
            ref="webview"
            style={{flex:1,backgroundColor:'#ff0000'}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            startInLoadingState={true}
            source={{uri: this.props.route.url}}
            />);
    }
}

export default MyWebView;