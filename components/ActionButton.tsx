import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

interface ActionButtonProps {
  color?: string
  iconName?: string
  onPress: () => void
  title?: string
}

export default function ActionButton(props: ActionButtonProps) {
  const [isInProgress, setIsInProgress] = React.useState(false)

  const onPress = async () => {
    setIsInProgress(true)
    // TODO: Can we isInProgress after the onPress is finished without awrning of unused await?
    await props.onPress()
    setIsInProgress(false)
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: Layout.margin,
    padding: Layout.padding,
  },
  icon: {
    color: Color.text,
    fontSize: Layout.hugeFontSize,
  },
  text: {
    color: Color.text,
    fontSize: Layout.fontSize,
    margin: Layout.margin,
  },
})
