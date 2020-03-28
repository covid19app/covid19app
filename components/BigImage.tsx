import * as React from 'react';
import { Image, ImageProps, StyleSheet, Text, View } from 'react-native';

import Color from '../constants/Color';
import Layout from '../constants/Layout';

interface BigImageProps extends ImageProps {
  title?: string
}

export default function BigImage(props: BigImageProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} {...props} />
      {props.title && <Text style={styles.text}>{props.title}</Text>}
    </View>
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
