import * as React from 'react';
import { ActivityIndicator, Linking, StyleSheet, View, TouchableOpacity } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

import Layout from '../constants/Layout';
import Color from '../constants/Color';

interface WebBrowserProps {
  url: string,
}

export default function WebBrowser(props: WebBrowserProps) {
  const [webViewNavigation, setWebViewNavigation] = React.useState({} as WebViewNavigation)
  const webViewRef = React.useRef<WebView>()

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: props.url }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator color={Color.text} size='large' />
        )}
        ref={webViewRef}
        onNavigationStateChange={setWebViewNavigation}
      />
      <View style={styles.tabBarContainer}>
        <TouchableOpacity disabled={!webViewNavigation.canGoBack}
            onPress={ () => webViewNavigation.canGoBack && webViewRef.current && webViewRef.current.goBack() }>
          <Ionicons name='md-arrow-round-back' style={styles.icon} size={Layout.largeIconSize}
              color={webViewNavigation.canGoBack ? Color.text : styles.tabBarContainer.backgroundColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => Linking.openURL(props.url) }>
          <Ionicons name='md-browsers' style={styles.icon} size={Layout.largeIconSize} />
        </TouchableOpacity>
        <TouchableOpacity disabled={!webViewNavigation.canGoForward}
            onPress={ () => webViewNavigation.canGoForward && webViewRef.current && webViewRef.current.goForward() }>
          <Ionicons name='md-arrow-round-forward' style={styles.icon} size={Layout.largeIconSize}
              color={webViewNavigation.canGoForward ? Color.text : styles.tabBarContainer.backgroundColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    padding: Layout.padding,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Color.defaultAction,
  },
  icon: {
  },
});
