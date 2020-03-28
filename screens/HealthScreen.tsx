import * as React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import PersonSymptomsForm from '../components/PersonSymptomsForm';
import Color from '../constants/Color';
import { PersonEntityContext } from '../utils/Device';
import { NextSteps } from '../utils/schema';

export default function HealthScreen({ navigation }) {
  const { personEntity } = React.useContext(PersonEntityContext)

  const handleSubmitSymptoms = (nextSteps: NextSteps) => {
    navigation.navigate('NextSteps', { nextSteps })
  }

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/temperature_chart.png')} style={styles.temperatureChart} /> */}
      <PersonSymptomsForm personId={personEntity?.personId} onSubmitResponse={handleSubmitSymptoms} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
})
