import * as React from 'react';
import { Picker, PickerProps, StyleSheet, Text, View } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

interface NamedPickerProps extends PickerProps {
  items: any[]
  title: string
}

export default function NamedPicker(props: NamedPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Picker {...props} style={styles.picker}>
        {props.items.map((item, index) => <Picker.Item label={item} value={index} key={index} />)}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.padding,
  },
  picker: {
    backgroundColor: Color.inputBackground,
    flex: 7,
  },
  title: {
    color: Color.text,
    flex: 2,
    fontSize: Layout.fontSize,
  },
})
