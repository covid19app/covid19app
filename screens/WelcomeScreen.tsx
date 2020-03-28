import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { PersonProfileForm, PersonProfileFormProps } from '../components/PersonProfileForm';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { t, tkeys } from '../utils/i18n';

interface WelcomeScreenProps extends PersonProfileFormProps {
}

export default function WelcomeScreen(props: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/covid19-shield.256.png')} style={styles.headerIcon} />
        <View style={styles.headerMessage}>
          <Text style={styles.text}>{t(tkeys.welcome_Title)}</Text>
          <Text style={styles.text}>{t(tkeys.welcome_Tip)}</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <PersonProfileForm {...props} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
    flexDirection: 'column',
    padding: Layout.padding,
    paddingBottom: 3 * Layout.fontSize,
    paddingTop: 3 * Layout.fontSize,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  headerIcon: {
    backgroundColor: Color.inputBackground,
    flex: 1,
    height: 0.25 * Layout.innerSize,
    margin: Layout.margin,
    resizeMode: 'contain',
    width: Layout.columnWidth,
  },
  headerMessage: {
    flex: 3,
    width: Layout.columnWidth,
  },
  formContainer: {
    flex: 1,
    flexGrow: 3,
  },
  text: {
    color: Color.text,
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
  },
})
