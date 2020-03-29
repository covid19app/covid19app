import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { ActivityIndicator, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView, WebViewNavigation, WebViewProps } from 'react-native-webview';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

interface WebBrowserProps extends WebViewProps {
}

export default function WebBrowser(props: WebBrowserProps) {
  const [webViewNavigation, setWebViewNavigation] = React.useState<WebViewNavigation>()
  const webViewRef = React.useRef<WebView>()
  const rootUrl = 'uri' in props?.source ? props?.source?.uri : undefined

  return (
    <View style={styles.container}>
      <WebView
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator color={Color.text} size='large' />}
        ref={webViewRef}
        onNavigationStateChange={setWebViewNavigation}
        {...props}
      />
      <View style={styles.tabBarContainer}>
        <TouchableOpacity disabled={!webViewNavigation?.canGoBack}
            onPress={() => webViewNavigation?.canGoBack && webViewRef.current?.goBack()}>
          <Ionicons name='md-arrow-round-back' style={styles.icon}
              color={webViewNavigation?.canGoBack ? Color.text : Color.iconHidden} />
        </TouchableOpacity>
        <TouchableOpacity disabled={!(webViewNavigation?.url || rootUrl)}
            onPress={() => Linking.openURL(webViewNavigation?.url || rootUrl)}>
          <Ionicons name='md-browsers' style={styles.icon}
              color={(webViewNavigation?.url || rootUrl) ? Color.text : Color.iconHidden} />
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
    backgroundColor: Color.secondaryAction,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Layout.padding,
  },
})
