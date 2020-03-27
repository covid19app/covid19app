import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

interface ActionButtonProps {
  title?: string
  color?: string
  iconName?: string
  onPress: (event: GestureResponderEvent) => void
}

export default function ActionButton(props: ActionButtonProps) {
  const [isInProgress, setIsInprogress] = React.useState(false)

  const onPress = async (event: GestureResponderEvent) => {
    setIsInprogress(true)
    props.onPress(event)
    setIsInprogress(false)
  }

  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: props.color || Color.defaultAction}]} onPress={onPress}>
      { !!isInProgress && <ActivityIndicator color={Color.text} size='large' /> }
      { !!props.iconName && <Ionicons name={props.iconName} style={styles.icon} /> }
      { !!props.title && <Text style={styles.text}>{props.title}</Text> }
    </TouchableOpacity>
  )
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
    fontSize: Layout.hugeFontSize,
  },
  text: {
    color: Color.text,
    margin: Layout.margin,
    fontSize: Layout.fontSize,
  },
})
