import * as React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import WebView from 'react-native-webview';

import { NextSteps } from '../utils/NextSteps';
import { PersonIdContext } from '../utils/People';
import SymptomsForm from '../components/SymptomsForm';
import ActionButton from '../components/ActionButton';
import Layout from '../constants/Layout';
import Color from '../constants/Color';

export default function PersonScreen() {
  const personId = React.useContext(PersonIdContext)
  const [nextSteps, setNextSteps] = React.useState(undefined as NextSteps)

  if (!!nextSteps) {
    return (
      <View style={styles.container}>
        <Text style={styles.actionText}>Please take following action: {nextSteps.action}</Text>
        <WebView source={{ html: nextSteps.html }} />
        { !!nextSteps.externalLink &&
          <ActionButton title="Take action" color={Color.defaultAction} onPress={ () => Linking.openURL(nextSteps.externalLink) } />
        }
        <ActionButton title="Enter symptoms" color={Color.defaultAction} onPress={ () => setNextSteps(undefined) } />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* <Image source={require('../assets/temperature_chart.png')} style={styles.temperatureChart} /> */}
        <SymptomsForm personId={personId} onSubmitResponse={setNextSteps} />
      </View>
    );
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
});
