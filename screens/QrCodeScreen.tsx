import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { getPersonUrl } from '../utils/Api';
import { PersonEntityContext } from '../utils/Device';
import { t, tkeys } from '../utils/i18n';

export default function QrCodeScreen() {
  const { personEntity } = React.useContext(PersonEntityContext)
  return (
    <View style={styles.container}>
      <Text style={styles.tipText}>{t(tkeys.qrcode_Tip)}</Text>
      <QRCode value={getPersonUrl(personEntity?.personId)} size={0.8 * Layout.innerSize} />
      <Text style={styles.personIdText}>{personEntity?.personId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Color.background,
    flex: 1,
  },
  personIdText: {
    fontSize: Layout.tinyFontSize,
  },
  tipText: {
    fontSize: Layout.fontSize,
    padding: Layout.padding,
  },
})
