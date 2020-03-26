import * as React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

import ActionButton from '../components/ActionButton';
import SymptomsForm from '../components/SymptomsForm';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { PersonIdContext } from '../utils/Device';
import { NextSteps } from '../utils/schema';

export default function PersonScreen() {
  const personId = React.useContext(PersonIdContext)
  const [nextSteps, setNextSteps] = React.useState<NextSteps>()

  if (!!nextSteps) {
    return (
      <View style={styles.container}>
        <Text style={styles.actionText}>Please take following action: {nextSteps.action}</Text>
        <WebView source={{ html: nextSteps.html }} />
        { !!nextSteps.externalLink &&
          <ActionButton title="Take action" color={Color.defaultAction}
              onPress={ () => Linking.openURL(nextSteps.externalLink) } />
        }
        <ActionButton title="Enter symptoms" color={Color.defaultAction} onPress={ () => setNextSteps(undefined) } />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        {/* <Image source={require('../assets/temperature_chart.png')} style={styles.temperatureChart} /> */}
        <SymptomsForm personId={personId} onSubmitResponse={setNextSteps} />
      </View>
    )
  }
}

PersonScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.background,
  },
  actionText: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
})
