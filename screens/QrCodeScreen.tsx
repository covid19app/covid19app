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
      <Text style={styles.tip}>{t(tkeys.qrcode_Tip)}</Text>
      <QRCode value={getPersonUrl(personEntity?.personId)} size={0.9 * Layout.innerSize} />
      <Text style={styles.personIdText}>{personEntity?.personId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.background,
  },
  tip: {
    fontSize: Layout.fontSize,
    padding: Layout.padding,
  },
  personIdText: {
    fontSize: Layout.tinyFontSize,
  },
})
