import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function CdcScreen() {
  return (
    <WebView source={{ uri: 'https://www.cdc.gov/coronavirus/2019-ncov/index.html' }} style={{ marginTop: 20 }} />
  );
}
