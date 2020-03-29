import * as React from 'react';
import { ActivityIndicator, Image, ImageProps, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

export interface BigButtonProps {
  backgroundColor?: string
  children?: React.ReactNode
  onPress?: () => void
  title?: string,
}

export function BigImage(props: ImageProps) {
  return <Image style={styles.image} {...props} />
}

export function BigButton(props: BigButtonProps) {
  const style = [styles.container, props.backgroundColor && {backgroundColor: props.backgroundColor}]
  return (
    <TouchableOpacity style={style} disabled={!props.onPress} onPress={props.onPress}>
      {props.children}
      {props.title && <Text style={styles.text}>{props.title}</Text>}
    </TouchableOpacity>
  )
}

export interface BigImageButtonProps extends BigButtonProps {
  imageSource: ImageSourcePropType
  isInProgress?: boolean
}

export default function BigImageButton(props: BigImageButtonProps) {
  return (
    <BigButton {...props} >
      { props.isInProgress && <ActivityIndicator color={Color.text} size='large' /> }
      { props.isInProgress || <BigImage source={props.imageSource} /> }
    </BigButton>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    margin: Layout.margin,
  },
  image: {
    height: 0.2 * Layout.innerSize - Layout.margin,
    resizeMode: 'contain',
    width: Layout.columnWidth - 2 * Layout.margin,
  },
  text: {
    color: Color.text,
    fontSize: Layout.fontSize,
  },
})
