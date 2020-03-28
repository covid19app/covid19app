import * as React from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';

import Color from '../constants/Color';
import BigImage from './BigImage';

interface SymptomButtonProps {
  imageSource: ImageSourcePropType,
  title?: string,
  active: boolean
  onPress?: () => void
}

export default function SymptomButton(props: SymptomButtonProps) {
  const activeBasedStyle = props.active && {backgroundColor: Color.infected} // || {backgroundColor: Color.notInfected}
  return (
    <TouchableOpacity style={activeBasedStyle} disabled={!props.onPress} onPress={props.onPress}>
      <BigImage source={props.imageSource} title={props.title} />
    </TouchableOpacity>
  )
}
