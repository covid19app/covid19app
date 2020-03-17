import * as React from 'react';
import { Slider, StyleSheet, Text, View } from 'react-native';

// enum TemperatureScale {
//   Celsius,
//   Fahrenheit,
// }

type FeverSliderProps = {
  temperatureScale: string,
  feverInCelsius: number,
  onValueChange?: (feverInCelsius: number) => void,
}

export default function FeverSlider(props: FeverSliderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fever</Text>
      <Slider
        style={styles.slider}
        minimumValue={36}
        maximumValue={44}
        value={props.feverInCelsius}
        onValueChange={props.onValueChange}
      />
      <Text style={styles.value}>{temperatureToString(props.temperatureScale, props.feverInCelsius)}</Text>
    </View>
  );
}

function temperatureToString(temperatureScale: string, temperatureInC: number): string {
  switch (temperatureScale) {
    case 'C':
      return `${temperatureInC && +temperatureInC.toFixed(1)} C`
    case 'F':
      const temperatureInF = (temperatureInC * 9/5) + 32
      return `${temperatureInF && +temperatureInF.toFixed(1)} F`
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  title: {
    flex: 2,
    color: '#000',
    fontSize: 20,
  },
  slider: {
    flex: 7,
  },
  value: {
    flex: 3,
    color: '#000',
    fontSize: 20,
  },
});
