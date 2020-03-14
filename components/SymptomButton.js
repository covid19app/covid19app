import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function SymptomButton(props) {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: props.backgroundColor}]} onPress={props.onPress}>
      <Ionicons
        name={props.name}
        style={styles.icon}
        size={48}
      />
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#bbb',
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
