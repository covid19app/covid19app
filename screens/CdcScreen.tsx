import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CdcScreen() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://www.cdc.gov/coronavirus/2019-ncov/index.html' }} style={styles.container} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexGrow: '',
    // padding: 20,
    // alignItems: 'center',
  },
});
