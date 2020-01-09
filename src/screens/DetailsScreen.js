import React, {Fragment, PureComponent} from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';

class DetailsScreen extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <Fragment>
        <Text
          style={{
            fontSize: 22
          }}
        >
          {navigation.state.params.title}
        </Text>
        <WebView source={{ uri: navigation.state.params.url }} />
      </Fragment>
    );
  }
}

export default DetailsScreen;
