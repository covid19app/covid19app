import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View, Linking } from 'react-native';

import { generatePersonId } from '../utils/Events';
import SymptomsForm from '../components/SymptomsForm';
import { NextSteps } from '../utils/NextSteps';
import WebView from 'react-native-webview';
import SubmitButton from '../components/SubmitButton';

// TODO: support multiple people per app
const personId = generatePersonId()

export default function PersonScreen() {
  const [nextSteps, setNextSteps] = useState(undefined as NextSteps)

  if (nextSteps === undefined) {
    return (
      <View style={styles.container}>
        {/* <Image source={require('../assets/temperature_chart.png')} style={styles.temperatureChart} /> */}
        <SymptomsForm personId={personId} onSubmitResponse={setNextSteps} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.actionText}>Please {nextSteps.action}</Text>
        <WebView source={{ html: nextSteps.html }} />
        { nextSteps.externalLink !== undefined && nextSteps.externalLink !== null &&
          <SubmitButton title="take action" onPress={() => Linking.openURL(nextSteps.externalLink)}/>
        }
        <SubmitButton title="enter symptoms" onPress={() => setNextSteps(undefined)}/>
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
    backgroundColor: '#fff',
  },
  actionText: {
    color: '#000',
    fontSize: 20,
  },
});
