import * as React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import ActionButton from '../components/ActionButton';
import Prevention from '../components/Prevention';
import WebBrowser from '../components/WebBrowser';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { t, tkeys } from '../utils/i18n';

export default function NextStepsScreen({ route }) {
  const nextSteps = route.params?.nextSteps

  if (!nextSteps) {
    return <Prevention />
  }

  return (
    <View style={styles.container}>
      { !!nextSteps.text &&
        <Text style={styles.text}>{nextSteps.text}</Text>
      }
      { !!nextSteps.html &&
        <WebBrowser style={styles.html} originWhitelist={['*']} source={{ html: nextSteps.html }} />
      }
      { !!nextSteps.externalLink &&
        <ActionButton
            title={nextSteps.externalLinkTitle || t(tkeys.generic_OpenExternalLink)}
            color={Color.defaultAction}
            onPress={ () => Linking.openURL(nextSteps.externalLink) } />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.background,
  },
  text: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
  html: {
  },
})
