import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import Layout from '../constants/Layout';
import { getPersonUrl } from '../utils/Api';
import { PersonIdContext } from '../utils/Device';

export default function QrCodeScreen() {
  const personId = React.useContext(PersonIdContext)
  return (
    <View style={styles.container}>
      <Text style={styles.tip}>This code represents your personal id.
          Share it with the lab and get the result delivered to your phone!</Text>
      <QRCode value={getPersonUrl(personId)} size={0.9 * Layout.innerSize} />
      <Text style={styles.personIdText}>{personId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tip: {
    fontSize: Layout.fontSize,
    padding: Layout.padding,
  },
  personIdText: {
    fontSize: Layout.tinyFontSize,
  },
})
