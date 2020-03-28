import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { ActivityIndicator, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

interface WebBrowserProps {
  url: string
}

export default function WebBrowser(props: WebBrowserProps) {
  const [webViewNavigation, setWebViewNavigation] = React.useState<WebViewNavigation>()
  const webViewRef = React.useRef<WebView>()

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: props.url }}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator color={Color.text} size='large' />}
        ref={webViewRef}
        onNavigationStateChange={setWebViewNavigation}
      />
      <View style={styles.tabBarContainer}>
        <TouchableOpacity disabled={!webViewNavigation?.canGoBack}
            onPress={() => webViewNavigation?.canGoBack && webViewRef.current?.goBack()}>
          <Ionicons name='md-arrow-round-back' style={styles.icon}
              color={webViewNavigation?.canGoBack ? Color.text : Color.iconHidden} />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => Linking.openURL(props.url) }>
          <Ionicons name='md-browsers' style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity disabled={!webViewNavigation?.canGoForward}
            onPress={() => webViewNavigation?.canGoForward && webViewRef.current?.goForward()}>
          <Ionicons name='md-arrow-round-forward' style={styles.icon}
              color={webViewNavigation?.canGoForward ? Color.text : Color.iconHidden} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    fontSize: Layout.largeIconSize,
  },
  tabBarContainer: {
    backgroundColor: Color.defaultAction,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Layout.padding,
  },
})
