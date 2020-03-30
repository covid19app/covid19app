import { Button, Icon, NativeBase } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

interface ActionButtonProps extends NativeBase.Button {
  iconName?: string
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
    <Button {...props} block large iconLeft onPress={onPress} style={styles.button}>
      { !!isInProgress && <ActivityIndicator color={Color.text} size='large' /> }
      { !!props.iconName && <Icon name={props.iconName} /> }
      { !!props.title && <Text style={styles.text}>{props.title}</Text> }
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    margin: Layout.margin,
  },
  text: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
})
