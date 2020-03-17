import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

type SubmitButtonProps = {
  title?: string,
  onPress?: (event: GestureResponderEvent) => void,
}

export default function SubmitButton(props: SubmitButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      {/* <Ionicons name="md-thumbs-up" style={styles.icon} size={32} /> */}
      <Text style={styles.text}>{props.title || "submit"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: "#bfb",
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#000',
  },
  text: {
    color: '#000',
    margin: 10,
    fontSize: 20,
  },
});
