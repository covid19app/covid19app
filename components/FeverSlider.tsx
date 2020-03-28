import * as React from 'react';
import { Slider, StyleSheet, Text, View } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';
import { t, temperatureToString, tkeys } from '../utils/i18n';

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
  )
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
})
