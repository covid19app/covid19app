import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import Color from '../constants/Color';

interface ActionButtonProps {
  inProgress?: boolean
  title?: string
  color?: string
  iconName?: string
  onPress?: (event: GestureResponderEvent) => void
}

export default function ActionButton(props: ActionButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: props.color || Color.defaultAction}]} onPress={props.onPress}>
      { !!props.inProgress && <ActivityIndicator color={Color.text} size='large' /> }
      { !!props.iconName && <Ionicons name={props.iconName} style={styles.icon} /> }
      { !!props.title && <Text style={styles.text}>{props.title}</Text> }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: Layout.padding,
    margin: Layout.margin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Color.text,
    fontSize: 32,
  },
  text: {
    color: Color.text,
    margin: Layout.margin,
    fontSize: Layout.fontSize,
  },
});
