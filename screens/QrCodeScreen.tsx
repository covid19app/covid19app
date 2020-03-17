import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import Api from '../constants/Api';
import Layout from '../constants/Layout';

export default function QrCodeScreen() {
  const personId = 'person_1'
  const size = Math.min(Layout.window.width, Layout.window.height)
  return (
    <View style={styles.container}>
      <QRCode value={`${Api.url}/v1/person/${personId}`} size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
});
