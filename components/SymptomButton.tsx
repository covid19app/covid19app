import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SymptomButtonProps = {
  icon: string,
  title: string,
  value: number,
  onPress?: (event: GestureResponderEvent) => void,
}

export default function SymptomButton(props: SymptomButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: getBackgroundColor(props.value)}]} onPress={props.onPress}>
      <Ionicons name={props.icon} style={styles.icon} size={48} />
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

function getBackgroundColor(value: number): string {
  if (value) {
    return "#bbf"
  } else {
    return "#bbb"
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#000',
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
});
