import * as React from 'react';
import { Slider, StyleSheet, Text, View } from 'react-native';

import { t, tkeys } from '../utils/i18n';
import Layout from '../constants/Layout';
import Color from '../constants/Color';

// import * as RNLocalize from 'react-native-localize';
//
// const cachedTemperatureUnit = RNLocalize.getTemperatureUnit()

const cachedTemperatureUnit: string = 'fahrenheit' // RNLocalize.getTemperatureUnit()

interface FeverSliderProps {
  feverInCelsius: number,
  onValueChange?: (feverInCelsius: number) => void,
}

export default function FeverSlider(props: FeverSliderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(tkeys.symptoms_Fever)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={36}
        maximumValue={44}
        value={props.feverInCelsius}
        onValueChange={props.onValueChange}
      />
      <Text style={styles.value}>{temperatureToString(props.feverInCelsius)}</Text>
    </View>
  );
}

function temperatureToString(temperatureInC: number): string {
  switch (cachedTemperatureUnit) {
    case 'celsius':
      return `${temperatureInC && +temperatureInC.toFixed(1)} C`
    case 'fahrenheit':
      const temperatureInF = (temperatureInC * 9/5) + 32
      return `${temperatureInF && +temperatureInF.toFixed(1)} F`
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Layout.padding,
  },
  title: {
    flex: 3,
    color: Color.text,
    fontSize: Layout.fontSize,
  },
  slider: {
    flex: 7,
  },
  value: {
    flex: 3,
    color: Color.text,
    fontSize: Layout.fontSize,
  },
});
