import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import SymptomButton from '../components/SymptomButton';

export default function MeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/temperature_chart.png')} style={styles.temperatureChart} />
      <Text>TODAY:</Text>
      <View style={styles.symptomButtonsContainer}>
        <SymptomButton name="md-thermometer" title="fever" backgroundColor="#bbf" />
        <SymptomButton name="md-megaphone" title="dry cough" backgroundColor="#fff" />
        <SymptomButton name="md-bed" title="fatigue" backgroundColor="#bbf" />
      </View>
      <SymptomButton name="md-thumbs-up" title="submit" backgroundColor="#bfb" />
    </View>
  );
}

MeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  symptomButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  temperatureChart: {
    width: "90%",
    resizeMode: 'contain',
    margin: 12,
  },
});
