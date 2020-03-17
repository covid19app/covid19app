import * as React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

type SymptomSwitchProps = {
  title: string,
  value: number,
  onValueChange?: (value: boolean) => void,
}

export default function SymptomSwitch(props: SymptomSwitchProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Switch style={styles.switch} value={props.value > 0.0} onValueChange={props.onValueChange} />
      <Text style={styles.dummy}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  title: {
    flex: 5,
    color: '#000',
    fontSize: 20,
  },
  switch: {
    flex: 1,
  },
  dummy: {
    flex: 1,
  },
});
