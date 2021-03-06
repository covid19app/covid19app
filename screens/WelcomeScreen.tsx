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
        <Image source={require('../assets/virus_defence.png')} style={styles.headerImage} />
        <View style={styles.headerTextContainer}>
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
  formContainer: {
    flex: 1,
    flexGrow: 3,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  headerImage: {
    flex: 1,
    height: 0.25 * Layout.innerSize,
    margin: Layout.margin,
    resizeMode: 'contain',
    width: 0.25 * Layout.innerSize,
  },
  headerTextContainer: {
    flex: 3,
    width: Layout.columnWidth,
  },
  text: {
    color: Color.text,
    fontSize: Layout.bigFontSize,
    padding: Layout.padding,
  },
})
