import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

import ActionButton from '../components/ActionButton';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { t, tkeys } from '../utils/i18n';

export default function NextStepsScreen({ route }) {
  const nextSteps = route.params?.nextSteps

  if (!nextSteps) {
    return (
      <View style={styles.container}>
        <Ionicons name='md-happy' style={styles.bigIcon} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      { !!nextSteps.text &&
        <Text style={styles.text}>{nextSteps.text}</Text>
      }
      { !!nextSteps.html &&
        <WebView style={styles.html} source={{ html: nextSteps.html }} />
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
  bigIcon: {
    fontSize: 0.9 * Layout.innerSize,
    padding: 0.1 * Layout.innerSize,
  }
})
