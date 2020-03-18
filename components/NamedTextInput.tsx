import * as React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import Layout from '../constants/Layout';
import Color from '../constants/Color';

interface NamedTextInputProps extends TextInputProps {
  title: string
}

export default function NamedTextInput(props: NamedTextInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput {...props} style={styles.textInpout} />
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
  textInpout: {
    flex: 7,
    backgroundColor: Color.inputBackground,
  },
});
