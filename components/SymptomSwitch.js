import * as React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function SymptomSwitch(props) {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{props.title}</Text>
      <Switch value={props.value} onValueChange={props.onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    // flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#bbb',
    padding: 10,
    margin: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
});
