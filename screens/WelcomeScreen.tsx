import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PersonProfileForm, PersonProfileFormProps } from '../components/PersonProfileForm';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { t, tkeys } from '../utils/i18n';

interface WelcomeScreenProps extends PersonProfileFormProps {
}

export default function WelcomeScreen(props: WelcomeScreenProps) {
  return (
    <View style={styles.standAloneContainer}>
      <Text style={styles.text}>{t(tkeys.welcome_Title)}</Text>
      <Text style={styles.text}>{t(tkeys.welcome_Tip)}</Text>
      <PersonProfileForm {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  standAloneContainer: {
    flex: 1,
    backgroundColor: Color.background,
    padding: Layout.padding,
    paddingBottom: 3 * Layout.fontSize,
    paddingTop: 3 * Layout.fontSize,
  },
  text: {
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
    margin: Layout.margin,
    color: Color.text,
  },
})
