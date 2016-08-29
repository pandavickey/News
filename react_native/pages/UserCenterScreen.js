/**
 * Created by panda on 16/8/25.
 */

'use strict';

import React, {Component} from 'React';
import {
    Image,
    Text,
    View,
} from 'react-native';

class UserCenterScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text>{'正在加载中...'}</Text>
        </View>);
    }
}
export default UserCenterScreen;