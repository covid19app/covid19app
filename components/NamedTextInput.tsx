import * as React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

interface NamedTextInputProps extends TextInputProps {
  title: string
}

export default function NamedTextInput(props: NamedTextInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput {...props} style={styles.textInpout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.padding,
  },
  textInpout: {
    backgroundColor: Color.inputBackground,
    flex: 7,
  },
  title: {
    color: Color.text,
    flex: 2,
    fontSize: Layout.fontSize,
  },
})
