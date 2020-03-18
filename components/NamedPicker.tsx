import * as React from 'react';
import { Picker, PickerProps, StyleSheet, Text, View } from 'react-native';

import Layout from '../constants/Layout';
import Color from '../constants/Color';

interface NamedPickerProps extends PickerProps {
  title: string
  items: Array<any>
}

export default function NamedPicker(props: NamedPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Picker {...props} style={styles.picker}>
        {props.items.map((item, index) => {
          return (<Picker.Item label={item} value={index} key={index}/>) 
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.padding,
  },
  title: {
    flex: 2,
    color: Color.text,
    fontSize: Layout.fontSize,
  },
  picker: {
    flex: 7,
    backgroundColor: Color.inputBackground,
  },
});
